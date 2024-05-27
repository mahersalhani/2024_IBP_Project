import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '@/database/abstract.entity';
import { User } from '../user';
import { Message } from './message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'conversations' })
export class Conversation extends AbstractEntity<Conversation> {
  @ApiProperty({ example: 1, description: 'User id' })
  @Column()
  userId: number;

  @ApiProperty({ example: User, description: 'User', type: User })
  @OneToOne(() => User, (user) => user.conversation, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ApiProperty({ example: [Message], description: 'Messages' })
  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}
