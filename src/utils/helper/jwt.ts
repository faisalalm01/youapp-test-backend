import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';

dotenv.config();

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

export class JwtUtil {
  static isValidAuthHeader(authorization: string) {
    const token: string = authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.SECRET_KEY, {
      ignoreExpiration: false,
    });

    return payload;
  }
}

export class WsJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = context.switchToWs();
    return ctx.getClient().handshake;
  }
}
