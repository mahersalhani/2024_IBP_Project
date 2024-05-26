import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsPhoneNumber, IsString } from 'class-validator';

export class AddAddressDto {
  @ApiProperty({
    description: 'First name',
    example: 'John',
  })
  @IsDefined()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'Doe',
  })
  @IsDefined()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Phone number',
    example: '1234567890',
  })
  @IsDefined()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'Address',
    example: '123 Main St',
  })
  @IsDefined()
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Country',
    example: 'USA',
  })
  @IsDefined()
  @IsString()
  country: string;

  @ApiProperty({
    description: 'State',
    example: 'California',
  })
  @IsDefined()
  @IsString()
  state: string;

  @ApiProperty({
    description: 'City',
    example: 'Los Angeles',
  })
  @IsDefined()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Zip code',
    example: '90001',
  })
  @IsDefined()
  @IsString()
  zip: string;
}
