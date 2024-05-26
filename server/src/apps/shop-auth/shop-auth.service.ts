// Nestjs
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { InjectRedis } from '@nestjs-modules/ioredis';

import { nanoid } from 'nanoid';
import { Response } from 'express';
import { DataSource } from 'typeorm';

import { Redis } from 'ioredis';

import { catchingError } from '@/utils';
import { JwtPayload, OkRes, ShopUserRes, Tokens } from '@/common';

import { ILogin, IRegister } from './interfaces';

import { ShopUserService } from '../shop-user';
import { User, Verify } from '@/database';

@Injectable()
export class ShopAuthService {
  private readonly cookieDomain: string;
  private readonly frontendUrl: string;

  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private readonly dataSource: DataSource,
    private readonly userService: ShopUserService,
    private readonly emailService: MailerService,
    @InjectRedis() private readonly redis: Redis,
  ) {
    this.cookieDomain = this.config.get('COOKIES_DOMAIN');
    this.frontendUrl = this.config.get('FRONTEND_URL');
  }

  async login({ res, user }: ILogin) {
    try {
      delete user.password;

      await this.addTokens(res, user.uid);

      return {
        user,
        status: 'success',
      };
    } catch (error) {
      throw catchingError(error);
    }
  }

  async googleLogin({ res, user }: ILogin) {
    if (user.signInProvider !== 'google') res.redirect(`${this.frontendUrl}/login?error=invalid_provider`);

    await this.addTokens(res, user.uid);
    return res.redirect(`${this.frontendUrl}`);
  }

  async register(data: IRegister, res: Response) {
    const { email, password, firstName, lastName } = data;
    try {
      const user = await this.userService.createUser({
        email,
        password,
        firstName,
        lastName,
      });

      const payload: ShopUserRes = {
        id: user.id,
        uid: user.uid,
        email: user.email,
        phone: user.phone,
        displayName: user.displayName,
        isBlocked: user.isBlocked,
        profileImage: user.avatar,
        accountType: user.accountType,
        emailVerified: user.emailVerified,
        signInProvider: user.signInProvider,
      };

      // cache the user
      await this.redis.set(`shop:user:${user.uid}`, JSON.stringify(payload), 'EX', 60 * 60 * 24 * 7 * 1000); // 7 days
      await this.addTokens(res, user.uid);

      return {
        id: user.id,
        uid: user.uid,
        email: user.email,
        phone: user.phone,
        // username: user.username,
        profileImage: user.avatar,
        isBlocked: user.isBlocked,
        emailVerified: user.emailVerified,
      };
    } catch (error) {
      throw catchingError(error);
    }
  }

  async verifyEmail(user: User, code: string) {
    return this.dataSource.transaction(async (manager) => {
      try {
        if (!user) throw new NotFoundException('User not found');
        if (user.emailVerified) throw new HttpException('Your email is already verified', HttpStatus.BAD_REQUEST);

        const verification = await manager
          .createQueryBuilder(Verify, 'verify')
          .where('verify.user_id = :userId', { userId: user.id })
          .getOne();

        if (!verification) throw new NotFoundException('INVALID_CODE');

        if (verification.code !== code.toString()) throw new HttpException('INVALID_CODE', HttpStatus.BAD_REQUEST);

        if (verification.expiresAt < new Date()) throw new HttpException('CODE_EXPIRED', HttpStatus.BAD_REQUEST);

        const currentUser = new User({ id: user.id });
        currentUser.emailVerified = true;
        currentUser.verify = null;

        const cacheKey = `shop:user:${user.uid}`;

        // delete the verification code
        await manager.delete(Verify, { id: verification.id });
        const cachedUser = await this.redis.get(cacheKey);

        if (cachedUser) {
          const payload: ShopUserRes = {
            ...JSON.parse(cachedUser),
            emailVerified: true,
          };

          await this.redis.set(cacheKey, JSON.stringify(payload), 'EX', 60 * 60 * 24 * 7 * 1000); // 7 days
        }

        await manager.save(currentUser);

        return new OkRes('Email verified successfully', HttpStatus.OK);
      } catch (error) {
        throw catchingError(error);
      }
    });
  }

  async sendVerificationEmail(user: User) {
    return this.dataSource.transaction(async (manager) => {
      try {
        if (user.emailVerified) throw new HttpException('user already verified', HttpStatus.BAD_REQUEST);

        const currentUser = await manager.findOne(User, {
          where: { id: user.id },
          relations: ['verify'],
        });

        const oldVerificationIds = currentUser.verify?.id;

        // generate a new code
        const code = Math.floor(100000 + Math.random() * 900000);
        const verify = new Verify({});

        verify.code = `${code}`;
        verify.expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

        currentUser.verify = verify;

        const emailData: ISendMailOptions = {
          to: user.email,
          from: 'Support SHOPPY <no-replay@imaginativehub.online>', // TODO change the from email
          subject: 'Verify your email',
          template: 'verifyEmail',
          context: { code },
        };

        this.emailService.sendMail(emailData);

        // delete the old verification codes
        await manager.delete(Verify, { id: oldVerificationIds });

        await manager.save(currentUser);

        return new OkRes('Verification code sent successfully', HttpStatus.OK);
      } catch (error) {
        throw catchingError(error);
      }
    });
  }

  async refreshToken(user: User, res: Response, middleware = false) {
    try {
      const tokens = await this.addTokens(res, user.uid);

      if (middleware) return tokens;

      return new OkRes('Refresh token successfully', HttpStatus.OK);
    } catch (error) {
      throw catchingError(error);
    }
  }

  async logout(refreshToken: string, res: Response) {
    try {
      res.clearCookie('_access_token', { domain: this.cookieDomain });
      res.clearCookie('_refresh_token', { domain: this.cookieDomain });

      const { sub, salt } = this.jwtService.decode<JwtPayload>(refreshToken);

      if (sub && salt) {
        const redisKey = `shop:user:${sub}:${salt}:refresh_tokens`;

        await this.redis.del(redisKey);
      }

      return new OkRes('Logout successfully', HttpStatus.OK);
    } catch (error) {
      throw catchingError(error);
    }
  }

  // async passwordResetEmail(email: string, host: string) {
  //   return this.dataSource.transaction(async (manager) => {
  //     try {
  //       // find the user
  //       const user = await manager.findOne(User, {
  //         where: { email },
  //         relations: { passwordToken: true },
  //         select: ['id', 'email'],
  //       });

  //       if (!user) throw new NotFoundException(resLocalization.error.USER_NOT_FOUND);

  //       if (user.passwordToken) {
  //         // delete the old password reset token
  //         await manager.delete(PasswordToken, { id: user.passwordToken.id });
  //       }

  //       const token = await nanoid(64);
  //       const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes
  //       const passwordVerify = new PasswordToken({ token, expiresAt, opened: false, used: false });
  //       user.passwordToken = passwordVerify;

  //       const emailTemplate = `
  //           <div>
  //             <h1>Reset your password</h1>
  //             <p>Click the following link to reset your password</p>
  //             <a href="${host}/auth/reset-password/${token}">Reset password</a>
  //             <p>
  //               <strong>NOTE: </strong>
  //               This link will expire in 15 minutes.
  //             </p>

  //             <p>
  //               If you did not request a password reset, please ignore this email or reply to let us know.
  //             </p>

  //             <p>
  //               Thanks,
  //               <br />
  //               Your friends at ecmarkt
  //             </p>
  //           </div>
  //         `;

  //       const emailData = {
  //         to: user.email,
  //         from: 'Support ImaginativeHub <no-replay@imaginativehub.online>',
  //         subject: 'Reset your password',
  //         html: emailTemplate,
  //       };

  //       await manager.save(user);

  //       this.emailService.sendMail(emailData);

  //       return new OkRes(resLocalization.success.PASSWORD_RESET_EMAIL_SENT, HttpStatus.OK);
  //     } catch (error) {
  //       throw catchingError(error);
  //     }
  //   });
  // }

  // async tokenStatus(token: string) {
  //   return this.dataSource.transaction(async (manager) => {
  //     try {
  //       const passwordToken = await manager.findOne(PasswordToken, { where: { token } });

  //       if (!passwordToken) throw new NotFoundException(resLocalization.error.TOKEN_NOT_FOUND);

  //       if (passwordToken.expiresAt < new Date()) {
  //         throw new BadRequestException(resLocalization.error.TOKEN_EXPIRED);
  //       }

  //       if (passwordToken.opened) {
  //         if (!passwordToken.used) {
  //           passwordToken.used = true;
  //           await this.entityManager.save(passwordToken);
  //         }

  //         throw new BadRequestException(resLocalization.error.TOKEN_ALREADY_USED);
  //       }

  //       passwordToken.opened = true;

  //       await manager.save(passwordToken);

  //       return new OkRes(resLocalization.success.TOKEN_VALID, HttpStatus.OK);
  //     } catch (error) {
  //       throw catchingError(error);
  //     }
  //   });
  // }

  // async resetPassword(token: string, password: string, email: string) {
  //   return this.dataSource.transaction(async (manager) => {
  //     try {
  //       if (token.length !== 64) throw new BadRequestException('Invalid token');

  //       const user = await manager.findOne(User, {
  //         where: { email },
  //         relations: { passwordToken: true },
  //         select: ['id', 'email', 'passwordToken', 'uid'],
  //       });

  //       if (!user) throw new NotFoundException(resLocalization.error.USER_NOT_FOUND);

  //       if (!user.passwordToken) {
  //         // check if the token exists
  //         const passwordVerify = await manager.findOne(PasswordToken, {
  //           where: { token },
  //         });

  //         if (passwordVerify) await this.entityManager.delete(PasswordToken, { id: passwordVerify.id });

  //         throw new NotFoundException(resLocalization.error.PASSWORD_RESET_TOKEN_NOT_FOUND);
  //       }

  //       if (user.passwordToken.token !== token) {
  //         // find the token and mark it as used
  //         const passwordVerify = await manager.findOne(PasswordToken, {
  //           where: { token },
  //         });

  //         if (!passwordVerify) throw new NotFoundException(resLocalization.error.PASSWORD_RESET_TOKEN_NOT_FOUND);

  //         passwordVerify.used = true;

  //         // delete the old password reset token
  //         await manager.delete(PasswordToken, { id: user.passwordToken.id });

  //         throw new BadRequestException(resLocalization.error.INVALID_TOKEN);
  //       }

  //       if (user.passwordToken.used) throw new BadRequestException(resLocalization.error.TOKEN_ALREADY_USED);

  //       if (user.passwordToken.expiresAt < new Date())
  //         throw new BadRequestException(resLocalization.error.TOKEN_EXPIRED);

  //       user.password = await bcrypt.hash(password, 10);
  //       user.passwordToken = null;
  //       user.passwordUpdatedAt = new Date();

  //       // delete the old password reset token
  //       await manager.delete(PasswordToken, { token });

  //       await this.redis.del(`user:${user.uid}`);
  //       await this.redis.del(`user:${user.uid}:refresh_tokens`);

  //       await manager.save(user);

  //       const emailTemplate = `
  // 				<div>
  // 					<h1>Password reset successfully</h1>
  // 					<p>Your password has been reset successfully</p>
  // 					<p>
  // 						<strong>NOTE: </strong>
  // 						If you did not request a password reset, please reply to let us know.
  // 					</p>

  // 					<p>
  // 						Thanks,
  // 						<br />
  // 						Your friends at ecmarkt
  // 					</p>
  // 				</div>
  // 			`;

  //       const emailData = {
  //         to: user.email,
  //         subject: 'Password reset successfully',
  //         html: emailTemplate,
  //         from: 'Support ImaginativeHub <no-replay@imaginativehub.online>',
  //       };

  //       this.emailService.sendMail(emailData);

  //       return new OkRes(resLocalization.success.PASSWORD_RESET_SUCCESS, HttpStatus.OK);
  //     } catch (error) {
  //       throw catchingError(error);
  //     }
  //   });
  // }

  // utility function
  async addTokens(res: Response, userId: string) {
    try {
      const { accessToken, refreshToken, salt } = await this.getTokens(userId);

      res.cookie('_access_token', accessToken, {
        signed: true,
        httpOnly: true,
        domain: this.cookieDomain,
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
      });

      res.cookie('_refresh_token', refreshToken, {
        signed: true,
        httpOnly: true,
        domain: this.cookieDomain,
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
      });

      const redisKey = `shop:user:${userId}:${salt}:refresh_tokens`;

      await this.redis.set(redisKey, refreshToken, 'EX', 60 * 60 * 24 * 7); // 7 days

      return { accessToken, refreshToken };
    } catch (error) {
      throw catchingError(error);
    }
  }

  // utility function
  async getTokens(userId: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      salt: nanoid(32),
    };

    const [accessToken, RefreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_SECRET'),
        expiresIn: '60m',
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: accessToken,
      refreshToken: RefreshToken,
      salt: jwtPayload.salt,
    };
  }
}
