import { Role } from '@/common/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class QueryUsersDto {
  @ApiProperty({})
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({})
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ required: false, enum: Role, enumName: 'UserRole' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ required: false })
  @IsOptional()
  isBlocked?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sort?: string;

  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], enumName: 'QueryOrder' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  order?: 'ASC' | 'DESC';
}
//
