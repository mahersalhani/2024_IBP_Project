import { Column, Entity, OneToOne, AfterLoad } from 'typeorm';

import { addImageURL } from '@/utils';
import { AbstractEntity } from '@/database/abstract.entity';

import { Verify } from './verify.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  displayName: string;

  @Column({ type: 'enum', enum: ['password', 'google'] })
  signInProvider: 'password' | 'google';

  @Column({ nullable: true })
  password: string;

  @Column()
  uid: string;

  @Column({ nullable: true })
  avatar: string;

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

  @AfterLoad()
  setAvatarUrl() {
    this.avatarUrl = this.avatar ? addImageURL(this.avatar) : this.avatar;
    this.displayName = this.firstName && this.lastName ? `${this.firstName} ${this.lastName}` : this.email;
  }
}
