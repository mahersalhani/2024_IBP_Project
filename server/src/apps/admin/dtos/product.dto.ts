import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ readOnly: true })
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  coverImage: string;

  @ApiProperty({ readOnly: true })
  slug: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  quantity: number;
}

export class ProductsRes {
  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];

  @ApiProperty()
  total: number;
}
