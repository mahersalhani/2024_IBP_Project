import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRes, OkRes, Roles, RolesGuard, ShopJwtAuthGuard } from '@/common';
import { Role } from '@/common/enums';

import { AdminService } from './admin.service';
import { ProductDto, QueryUsersDto } from './dtos';
import { UsersRes } from './res';

@ApiTags('Admin')
@Controller('admin')
@Roles(Role.Admin)
@UseGuards(ShopJwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('product')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Product created successfully', type: OkRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: BadRes })
  createProduct(@Body() data: ProductDto) {
    return this.adminService.createProduct(data);
  }

  @Put('product')
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product updated successfully', type: OkRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', type: BadRes })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found', type: OkRes })
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() data: ProductDto) {
    return this.adminService.updateProduct(id, data);
  }

  @Delete('product')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Product deleted successfully', type: OkRes })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found', type: OkRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: BadRes })
  @ApiOperation({ summary: 'Delete a product' })
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteProduct(id);
  }

  @Get('users')
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Users found', type: UsersRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: BadRes })
  getUsers(@Query() query: QueryUsersDto) {
    return this.adminService.getUsers(query);
  }
}
