import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';

import { MessagesService } from './messages/messages.service';
import { ConversationController } from './messages/messages.controller';

@Module({
  providers: [EventGateway, MessagesService],
  controllers: [ConversationController],
})
export class GatewayModule {}
