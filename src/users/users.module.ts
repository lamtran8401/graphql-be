import { Module } from '@nestjs/common';
import { UserRepository } from 'src/data/user.repo';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UsersResolver, UserRepository],
})
export class UsersModule {}
