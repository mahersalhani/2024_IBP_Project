import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser, Roles, RolesGuard, ShopJwtAuthGuard } from '@/common';
import { Role } from '@/common/enums';

import { Message, User } from '@/database';

import { EventGateway } from '../event.gateway';
import { MessagesService } from './messages.service';
import { MessageDto } from './dtos/message.dto';

@ApiTags('Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(
    private readonly eventGateway: EventGateway,
    private readonly messagesService: MessagesService,
  ) {}

  @Get('admin')
  @Roles(Role.Admin)
  @UseGuards(ShopJwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all conversations' })
  @ApiResponse({ status: 200, type: [User] })
  async getConversations() {
    return this.messagesService.getConversations();
  }

  @Post('admin')
  @Roles(Role.Admin)
  @UseGuards(ShopJwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create a message' })
  async createMessageAdmin(@CurrentUser() user: User, @Body() body: MessageDto) {
    const message = await this.messagesService.createMessageAdmin(user.uid, body.content, body.userUID);
    this.eventGateway.handleMessage(message, body.userUID);
  }

  @Post()
  @Roles(Role.Customer)
  @UseGuards(ShopJwtAuthGuard, RolesGuard)
  @UseGuards(ShopJwtAuthGuard)
  @ApiOperation({ summary: 'Create a message' })
  async createMessage(@CurrentUser() user: User, @Body() body: MessageDto) {
    const message = await this.messagesService.createMessage(user, body.content);
    this.eventGateway.handleMessage(message, user.uid);
  }

  @Get()
  @Roles(Role.Customer)
  @UseGuards(ShopJwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, type: [Message] })
  @ApiOperation({ summary: 'Get a user conversation' })
  async getConversation(@CurrentUser() user: User) {
    return this.messagesService.getConversation(user.id);
  }

  @Get('admin/:userId')
  @Roles(Role.Admin)
  @UseGuards(ShopJwtAuthGuard, RolesGuard)
  @ApiResponse({ status: 200, type: [Message] })
  @ApiOperation({ summary: 'Get a user conversation' })
  async getConversationAdmin(@Param('userId') userId: number) {
    return this.messagesService.getConversation(userId);
  }
}
