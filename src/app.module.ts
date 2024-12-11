import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ChatsModule } from './chats/chats.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, ChatsModule, UsersModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {}
