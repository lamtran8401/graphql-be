import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  getUserById(id: number): Promise<User> {
    return this.userRepo.findOne({ where: { id } });
  }

  async checkUser(username: string, password: string): Promise<User> {
    const foundUser = await this.userRepo.findOne({
      where: { username },
    });
    if (!foundUser) {
      throw new NotFoundException(`User #${username} not found`);
    }
    if (!(await argon.verify(foundUser.password, password))) {
      throw new BadRequestException(`Wrong password`);
    }
    return foundUser;
  }

  async addUser(user: CreateUserInput): Promise<User> {
    const foundUser = await this.userRepo.findOne({
      where: { username: user.username },
    });
    if (foundUser)
      throw new NotFoundException(`User #${user.username} already exists`);

    user.password = await argon.hash(user.password);

    return this.userRepo.save(user);
  }

  async updateUser(user: UpdateUserInput): Promise<User> {
    const foundUser = await this.userRepo.findOne({ where: { id: user.id } });
    if (!foundUser) {
      throw new NotFoundException(`User #${user.id} not found`);
    }
    return await this.userRepo.save(user);
  }

  async removeUser(id: number): Promise<boolean> {
    const res = await this.userRepo.delete(id);
    return res.affected > 0;
  }
}
