import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Conversation, Message, User } from '@/database';
import { catchingError } from '@/utils';

@Injectable()
export class MessagesService {
  constructor(private readonly dataSource: DataSource) {}

  async getConversations() {
    try {
      const conversation = await this.dataSource
        .createQueryBuilder(Conversation, 'conversation')
        .leftJoin('conversation.user', 'user')
        .addSelect(['user.id', 'user.email', 'user.firstName', 'user.lastName', 'user.avatar', 'user.uid'])
        .getMany();

      const user = conversation.map((item) => item.user);

      return user;
    } catch (error) {
      catchingError(error);
    }
  }

  async getConversation(userId: number) {
    try {
      const conversation = await this.dataSource
        .getRepository(Conversation)
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.messages', 'messages')
        .where('conversation.userId = :userId', { userId })
        .getOne();

      if (!conversation) {
        const newConversation = new Conversation({});
        newConversation.userId = userId;
        newConversation.messages = [];
        await this.dataSource.getRepository(Conversation).save(newConversation);

        return newConversation.messages;
      }

      return conversation.messages;
    } catch (error) {
      catchingError(error);
    }
  }

  async createMessage(user: User, content: string) {
    try {
      const conversation = await this.dataSource
        .getRepository(Conversation)
        .createQueryBuilder('conversation')
        .leftJoinAndSelect('conversation.messages', 'messages')
        .where('conversation.userId = :userId', { userId: user.id })
        .getOne();

      if (!conversation) {
        const newConversation = new Conversation({});
        newConversation.userId = user.id;
        newConversation.messages = [];
        await this.dataSource.getRepository(Conversation).save(newConversation);

        const newMessage = new Message({});
        newMessage.content = content;
        newMessage.conversationId = newConversation.id;
        newMessage.userId = user.uid;
        await this.dataSource.getRepository(Message).save(newMessage);

        return newMessage;
      }

      const newMessage = new Message({});
      newMessage.content = content;
      newMessage.conversation = conversation;
      newMessage.userId = user.uid;
      await this.dataSource.getRepository(Message).save(newMessage);

      return newMessage;
    } catch (error) {
      catchingError(error);
    }
  }

  async createMessageAdmin(userId: string, content: string, uid: string) {
    try {
      const user = await this.dataSource
        .createQueryBuilder(User, 'user')
        .leftJoinAndSelect('user.conversation', 'conversation')
        .where('user.uid = :uid', { uid })
        .getOne();

      const conversation = user?.conversation;

      if (!conversation) throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);

      const newMessage = new Message({});
      newMessage.content = content;
      newMessage.conversationId = conversation.id;
      newMessage.userId = userId;

      await this.dataSource.getRepository(Message).save(newMessage);

      return newMessage;
    } catch (error) {
      catchingError(error);
    }
  }
}
