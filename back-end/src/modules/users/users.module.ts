import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserSession } from '@/entities/user_sessions.enity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSession])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
