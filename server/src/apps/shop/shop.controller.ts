import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BadRes, OkRes } from '@/common';

import { ProductDto, ProductsRes } from '../admin/dtos';
import { QueryProductDto } from './dtos';
import { ShopService } from './shop.service';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get('product/:slug')
  @ApiResponse({ status: HttpStatus.OK, description: 'Product found', type: ProductDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Product not found', type: OkRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', type: BadRes })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error', type: BadRes })
  @ApiOperation({ summary: 'Get a product' })
  getProduct(@Param('slug') slug: string) {
    return this.shopService.getProduct(slug);
  }

  @Get('products')
  @ApiResponse({ status: HttpStatus.OK, description: 'Products found', type: ProductsRes })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request', type: BadRes })
  @ApiOperation({ summary: 'Get products' })
  getProducts(@Query() query: QueryProductDto) {
    return this.shopService.getProducts(query);
  }
}
