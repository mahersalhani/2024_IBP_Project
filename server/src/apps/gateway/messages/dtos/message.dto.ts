import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  content: string;

  @ApiProperty({ required: false })
  userUID: string;
}
