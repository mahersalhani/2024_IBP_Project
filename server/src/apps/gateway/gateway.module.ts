import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';

import { MessagesService } from './messages/messages.service';
import { MessagesController } from './messages/messages.controller';

@Module({
  providers: [EventGateway, MessagesService],
  controllers: [MessagesController],
})
export class GatewayModule {}
