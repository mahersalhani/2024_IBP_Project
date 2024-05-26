import { ApiProperty } from '@nestjs/swagger';

export class AddressRes {
  @ApiProperty({ example: 1, description: 'Address id' })
  id: number;

  @ApiProperty({ example: 'John', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  lastName: string;

  @ApiProperty({ example: '+905555555555', description: 'Phone number' })
  phone: string;

  @ApiProperty({ example: '123 Main St', description: 'Address' })
  address: string;

  @ApiProperty({ example: 'USA', description: 'Country' })
  country: string;

  @ApiProperty({ example: 'California', description: 'State' })
  state: string;

  @ApiProperty({ example: 'Los Angeles', description: 'City' })
  city: string;

  @ApiProperty({ example: '90001', description: 'Zip code' })
  zip: string;
}
