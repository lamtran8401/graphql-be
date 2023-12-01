import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from 'src/data/user.repo';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersRepo: UserRepository) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersRepo.addUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersRepo.getUsers();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersRepo.getUserById(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersRepo.updateUser(updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersRepo.removeUser(id);
  }
}
