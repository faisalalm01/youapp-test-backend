import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { RoomType } from '../type/room.type';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf((o) => o.type != RoomType.PERSONAL)
  name: string;

  @ApiProperty({ required: true })
  @IsArray()
  @ArrayNotEmpty()
  members: string[];

  @ApiProperty({ required: true, default: RoomType.PERSONAL })
  @IsEnum(RoomType)
  @ValidateIf((o) => o.type)
  type: RoomType;
}
