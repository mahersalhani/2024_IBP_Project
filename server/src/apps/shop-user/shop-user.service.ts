// nestjs
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

// package
import * as bcrypt from 'bcrypt';
import { ulid } from 'ulid';

import { DataSource } from 'typeorm';

import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

import { User, Verify } from '@/database';
import { catchingError, changeImageQuality, resizeImage } from '@/utils';

import { OkRes, ShopUserRes } from '@/common';
import { S3Service } from '@/common/aws'; // TODO Find why need to import like this

import { ICreateUser, IGoogleLogin, IUpdateProfile } from './interfaces';

@Injectable()
export class ShopUserService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly dataSource: DataSource,
    private readonly emailService: MailerService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async createUser(data: ICreateUser) {
    const { email, password } = data;

    return this.dataSource.transaction(async (manager) => {
      try {
        const uid = ulid();

        // check if user email or username already exists
        const userExists = await manager
          .createQueryBuilder(User, 'user')
          .where('user.email = :email', { email })
          .getOne();

        if (userExists) if (userExists.email === email) throw new HttpException('EMAIL_EXISTS', HttpStatus.BAD_REQUEST);

        const user = new User({});

        // hash password
        const hash = await bcrypt.hash(password, 10);

        user.uid = uid;
        user.email = email;
        user.password = hash;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.emailVerified = false;
        user.accountType = 'customer';
        user.signInProvider = 'password';

        // generate a 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000);
        const verify = new Verify({});
        verify.code = `${code}`;
        verify.expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes

        user.verify = verify;

        const emailData: ISendMailOptions = {
          to: user.email,
          from: 'Support SHOPPY <no-replay@imaginativehub.online>', // TODO change this
          subject: 'Verify your email',
          template: 'verifyEmail',
          context: { code },
        };

        await manager.save(user);

        // send email
        this.emailService.sendMail(emailData);

        return user;
      } catch (error) {
        throw catchingError(error);
      }
    });
  }

  async getUser({ sub }: { sub: string }) {
    const user = await this.redis.get(`shop:user:${sub}`);

    if (!user) throw new NotFoundException('User not found');

    return JSON.parse(user);
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.dataSource
        .getRepository(User)
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .getOne();

      if (!user || user.signInProvider !== 'password')
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

      const profileImage = user.avatar
        ? user.avatar?.includes('googleusercontent.com')
          ? user.avatar
          : this.s3Service.signUrl(user?.avatar)?.signedUrl
        : null;

      const userPayload: ShopUserRes = {
        id: user.id,
        uid: user.uid,
        email: user.email,
        isBlocked: user.isBlocked,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        profileImage,
        accountType: user.accountType,
        phone: user.phone,
        signInProvider: user.signInProvider,
      };

      await this.redis.set(`shop:user:${user.uid}`, JSON.stringify(userPayload), 'EX', 60 * 60 * 24 * 7 * 1000); // 7 days

      return userPayload;
    } catch (error) {
      throw catchingError(error);
    }
  }

  async googleLogin(googleUser: IGoogleLogin) {
    // const { email, username, picture } = googleUser;
    const { email, picture } = googleUser;

    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (user) {
      if (user.signInProvider !== 'google') return user;

      if (user.avatar?.includes('googleusercontent.com')) {
        if (user.avatar !== picture) {
          user.avatar = picture;
          await this.dataSource.manager.save(user);
        }
      }

      const profileImage = user.avatar
        ? user.avatar?.includes('googleusercontent.com')
          ? user.avatar
          : this.s3Service.signUrl(user?.avatar)?.signedUrl
        : null;

      const userPayload: ShopUserRes = {
        id: user.id,
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isBlocked: user.isBlocked,
        emailVerified: user.emailVerified,
        profileImage,
        accountType: user.accountType,
        phone: user.phone,
        signInProvider: user.signInProvider,
      };

      await this.redis.set(`shop:user:${user.uid}`, JSON.stringify(userPayload), 'EX', 60 * 60 * 24 * 7 * 1000); // 7 days

      return user;
    }

    const uid = ulid();

    const newUser = new User({});
    newUser.uid = uid;
    newUser.email = email;
    // newUser.username = username;
    newUser.avatar = picture;
    newUser.emailVerified = true;
    newUser.accountType = 'customer';
    newUser.signInProvider = 'google';

    await this.dataSource.manager.save(newUser);

    const userPayload: ShopUserRes = {
      id: newUser.id,
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      isBlocked: newUser.isBlocked,
      emailVerified: newUser.emailVerified,
      profileImage: newUser.avatar,
      accountType: newUser.accountType,
      phone: newUser.phone,
      signInProvider: newUser.signInProvider,
    };

    await this.redis.set(`shop:user:${newUser.uid}`, JSON.stringify(userPayload), 'EX', 60 * 60 * 24 * 7 * 1000); // 7 days

    return newUser;
  }

  // TODO check if I need to check if the refresh token is exist in the redis
  async validateRefreshToken(uid: string, refreshToken: string, salt: string) {
    const redisKey = `shop:user:${uid}:${salt}:refresh_tokens`;

    await this.redis.del(redisKey);

    return await this.getUser({ sub: uid });
  }

  async updateProfile(user: ShopUserRes, data: IUpdateProfile) {
    return this.dataSource.transaction(async (manager) => {
      const dbUser = await manager.createQueryBuilder(User, 'user').where('user.id = :id', { id: user.id }).getOne();

      if (!dbUser) throw new NotFoundException('User not found');

      // if (data.username) {
      //   const userExists = await manager
      //     .getRepository(User)
      //     .createQueryBuilder('user')
      //     .where('user.username = :username', { username: data.username })
      //     .andWhere('user.id != :id', { id: user.id })
      //     .getOne();

      //   if (userExists) throw new HttpException('Username already taken', HttpStatus.BAD_REQUEST);

      //   dbUser.username = data.username;
      // }

      if (data.phone) dbUser.phone = data.phone;

      if (data.avatar) {
        const file = await changeImageQuality(data.avatar.buffer, 70);
        const resizedImage = await resizeImage(file, 125, 125);

        const avatar = await this.s3Service.uploadBuffer(resizedImage, 'avatar', 'webp');

        const oldAvatar = dbUser.avatar;

        dbUser.avatar = avatar.key;

        if (oldAvatar) this.s3Service.deleteFile(oldAvatar);
      }

      await manager.save(dbUser);

      const cacheUserKey = `shop:user:${dbUser.uid}`;
      const cacheUser = await this.redis.get(cacheUserKey);

      if (cacheUser) {
        const profileImage = dbUser.avatar
          ? dbUser.avatar?.includes('googleusercontent.com')
            ? dbUser.avatar
            : this.s3Service.signUrl(dbUser?.avatar)?.signedUrl
          : null;

        const parsedUser = JSON.parse(cacheUser);
        // parsedUser.username = dbUser.username;
        parsedUser.phone = dbUser.phone;
        parsedUser.profileImage = profileImage;

        await this.redis.set(cacheUserKey, JSON.stringify(parsedUser), 'EX', 60 * 60 * 24 * 7 * 1000); // 7 days
      }

      return new OkRes('Profile updated');
    });
  }
}
