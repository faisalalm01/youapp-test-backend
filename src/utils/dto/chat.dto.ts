import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @ApiProperty({ description: 'Room ID of the chat', example: '63f2c2...' })
  @IsNotEmpty()
  readonly room_id: string;

  @ApiProperty({ description: 'Content of the chat', example: 'Hello, world!' })
  @IsNotEmpty()
  readonly content: string;
}

export class GetChatDto {
  @ApiProperty({
    description: 'ID of the last chat (for pagination)',
    required: false,
    example: '63f2c2...',
  })
  readonly last_id: string;

  @ApiProperty({
    description: 'Limit the number of chats retrieved',
    required: false,
    default: 10,
    example: 10,
  })
  readonly limit: number = 10;

  constructor(data) {
    Object.assign(this, data);
  }
}
