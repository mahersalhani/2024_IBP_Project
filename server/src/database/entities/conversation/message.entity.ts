import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/database/abstract.entity';
import { Conversation } from './conversation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'messages' })
export class Message extends AbstractEntity<Message> {
  @Column()
  @ApiProperty({ example: 'Hello', description: 'Message content' })
  content: string;

  @Column()
  @ApiProperty({ example: '1', description: 'User id' })
  userId: string;

  @Column()
  @ApiProperty({ example: 1, description: 'Conversation id' })
  conversationId: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}
