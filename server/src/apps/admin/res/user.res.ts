import { ApiProperty } from '@nestjs/swagger';

export class UserRes {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  signInProvider: 'password' | 'google';

  @ApiProperty()
  password: string;

  @ApiProperty()
  uid: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  accountType: 'customer' | 'admin';

  @ApiProperty()
  isBlocked: boolean;

  @ApiProperty()
  emailVerified: boolean;
}

export class UsersRes {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [UserRes] })
  users: UserRes[];
}
