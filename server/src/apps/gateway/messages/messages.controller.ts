import { Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser, ShopJwtAuthGuard } from '@/common';

import { EventGateway } from '../event.gateway';
import { User } from '@/database';

@Controller('messages')
export class MessagesController {
  constructor(private readonly eventGateway: EventGateway) {}

  @Post()
  @UseGuards(ShopJwtAuthGuard)
  test(@CurrentUser() user: User) {
    console.log(user);

    this.eventGateway.handleMessage('Hello World', 1);
    return 'Hello World';
  }
}
