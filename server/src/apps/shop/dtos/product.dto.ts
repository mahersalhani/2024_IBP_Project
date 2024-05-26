import { ApiProperty } from '@nestjs/swagger';

export class QueryProductDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  isPublished?: boolean;
}
