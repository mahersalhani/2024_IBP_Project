import { ApiProperty } from '@nestjs/swagger';

export class CMSUserRes {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of a user',
  })
  id: number;

  @ApiProperty({
    example: '1412',
    description: 'The long unique identifier of a user',
  })
  uid: string;

  @ApiProperty({
    example: 'John@jhon.co',
    description: 'Email of a user',
  })
  email: string;

  @ApiProperty({
    example: false,
    description: 'Is user disabled',
  })
  isUserDisabled: boolean;

  @ApiProperty({
    enum: ['super_admin', 'admin', 'stuff'],
    enumName: 'AccountType',
    example: 'admin',
    description: 'The type of account',
  })
  accountType: 'super_admin' | 'admin' | 'stuff';

  @ApiProperty({
    example: '+8801712345678',
    description: 'Phone number of a user',
  })
  phone: string;
}

export class ShopUserRes {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of a user',
  })
  id: number;

  @ApiProperty({
    example: '1412',
    description: 'The long unique identifier of a user',
  })
  uid: string;

  @ApiProperty({
    example: 'John@jhon.co',
    description: 'Email of a user',
  })
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Display name of a user',
  })
  displayName: string;

  @ApiProperty({
    example: false,
    description: 'Is user disabled',
  })
  isBlocked: boolean;

  @ApiProperty({
    example: false,
    description: 'Is email verified',
  })
  emailVerified: boolean;

  @ApiProperty({
    example: '+8801712345678',
    description: 'Phone number of a user',
  })
  profileImage: string;

  @ApiProperty({
    enum: ['customer', 'admin'],
    enumName: 'AccountType',
    example: 'admin',
    description: 'The type of account',
  })
  accountType: string;

  @ApiProperty({
    example: '+8801712345678',
    description: 'Phone number of a user',
  })
  phone: string;

  @ApiProperty({
    enum: ['password', 'google'],
    enumName: 'SignInProvider',
    example: 'password',
    description: 'The sign in provider',
  })
  signInProvider: 'password' | 'google';
}
