import * as dotenv from 'dotenv';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });

    if (!userService) {
      console.error('UsersService is not injected properly');
    }
  }

  async validate(payload: any) {
    console.log('Payload:', payload);
    const user = await this.userService.findOne(payload.sub);
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
}
