import { Request, Response } from 'express';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle, seconds } from '@nestjs/throttler';

import { User } from '@/database';
import { BadRes, CurrentUser, OkRes, ShopJwtAuthGuard, ShopUserRes, ThrottlerBehindProxyGuard } from '@/common';

import { ShopLoginRes } from './res';
import { ShopLocalAuthGuard } from './guards';
import { ShopAuthService } from './shop-auth.service';
import { LoginDto, RegisterDto, VerifyEmailDto } from './dtos';

@ApiTags('ShopAuth')
@UseGuards(ThrottlerBehindProxyGuard)
@Controller('shop-auth')
export class ShopAuthController {
  constructor(private readonly shopAuthService: ShopAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShopLocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'Login success', type: ShopLoginRes })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Bad request', type: BadRes })
  login(@CurrentUser() user: User, @Res({ passthrough: true }) res: Response) {
    return this.shopAuthService.login({ user, res });
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: RegisterDto })
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 201, description: 'Register success', type: ShopUserRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Bad request', type: BadRes })
  register(@Body() body: RegisterDto, @Res({ passthrough: true }) res: Response) {
    return this.shopAuthService.register(body, res);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShopJwtAuthGuard)
  @ApiBody({ type: VerifyEmailDto })
  @ApiOperation({ summary: 'Verify email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Verify email success', type: OkRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Bad request', type: BadRes })
  async verifyEmail(@CurrentUser() user: User, @Body() body: VerifyEmailDto) {
    return this.shopAuthService.verifyEmail(user, body.code);
  }

  @Post('send-email-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShopJwtAuthGuard)
  @Throttle({ default: { limit: 3, ttl: seconds(60) } }) // 3 requests per 60 seconds
  @ApiOperation({ summary: 'Send email verification' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Send email verification success', type: OkRes })
  @ApiResponse({ status: HttpStatus.TOO_MANY_REQUESTS, description: 'Too many requests', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Bad request', type: BadRes })
  async resendVerificationEmail(@CurrentUser() user: User) {
    return this.shopAuthService.sendVerificationEmail(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Logout success', type: OkRes })
  @ApiResponse({ status: 500, description: 'Bad request', type: BadRes })
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const refreshToken = req.signedCookies['_refresh_token'];
    return this.shopAuthService.logout(refreshToken, res);
  }

  @Get('current-user')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ShopJwtAuthGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get current user success', type: ShopUserRes })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Bad request', type: BadRes })
  async currentUser(@CurrentUser() user: User) {
    delete user.id;

    return user;
  }
}
