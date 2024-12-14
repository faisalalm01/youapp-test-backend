import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto, RegisterAuthDto } from 'src/utils/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginAuthDto) {
    const validateUser = await this.userService.validateUser(
      dto.email,
      dto.password,
    );
    const token = await this.signJwtToken(validateUser._id.toString());

    return {
      msg: 'Login Successfull',
      data: {
        user: validateUser,
        token: token,
      },
    };
  }

  async register(dto: RegisterAuthDto) {
    const createdUser = await this.userService.create(dto);
    const token = await this.signJwtToken(createdUser._id.toString());

    return {
      message: 'Register Successfull',
      data: {
        user: createdUser,
        token: token,
      },
    };
  }

  private async signJwtToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
