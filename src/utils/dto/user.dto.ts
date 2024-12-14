import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly about: string;

  @ApiProperty()
  readonly birthday: Date;

  @ApiProperty()
  readonly height: number;

  @ApiProperty()
  readonly weight: number;

  @ApiProperty()
  readonly interests: number[];
}
