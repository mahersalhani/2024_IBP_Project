import { AbstractEntity } from '@/database/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'verifies' })
export class Verify extends AbstractEntity<Verify> {
  @Column({ nullable: false })
  code: string;

  @Column({ nullable: false })
  expiresAt: Date;

  @OneToOne(() => User, (user) => user.verify, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
