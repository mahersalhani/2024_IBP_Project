import { Column, Entity, OneToOne, AfterLoad } from 'typeorm';

import { addImageURL } from '@/utils';
import { AbstractEntity } from '@/database/abstract.entity';

import { Verify } from './verify.entity';
import { Conversation } from '../conversation';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  firstName?: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ example: 'John Doe', description: 'Display name' })
  displayName: string;

  @Column({ type: 'enum', enum: ['password', 'google'] })
  signInProvider: 'password' | 'google';

  @Column({ nullable: true })
  password: string;

  @ApiProperty({ example: '123456', description: 'User ID' })
  @Column()
  uid: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL' })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'Avatar URL' })
  avatarUrl: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'enum', enum: ['customer', 'admin'] })
  accountType: 'customer' | 'admin';

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToOne(() => Verify, (verify) => verify.user, { cascade: true })
  verify: Verify;

  @OneToOne(() => Conversation, (conversation) => conversation.user, { cascade: true })
  conversation: Conversation;

  @AfterLoad()
  setAvatarUrl() {
    this.avatarUrl = this.avatar ? addImageURL(this.avatar) : this.avatar;
    this.displayName = this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : this.email;
  }
}
