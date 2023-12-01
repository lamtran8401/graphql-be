import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UpdateUserInput } from 'src/users/dto/update-user.input';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserRepository {
  private readonly filePath: string = join(
    process.cwd(),
    'src',
    'data',
    'data.json',
  );

  getUsers(): User[] {
    const data = this.readDataFromFile();
    return data.users;
  }

  getUserById(id: number): User {
    const data = this.readDataFromFile();
    const user = data.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  addUser(user: CreateUserInput): User {
    const data = this.readDataFromFile();
    const nextId =
      data.users.length > 0 ? Math.max(...data.users.map((u) => u.id)) + 1 : 1;
    const newUser: User = { ...user, id: nextId };
    data.users.push(newUser);
    this.writeDataToFile(data);
    return newUser;
  }

  updateUser(user: UpdateUserInput): void {
    const data = this.readDataFromFile();
    const index = data.users.findIndex((u) => u.id === user.id);
    data.users[index] = { ...data.users[index], ...user };
    this.writeDataToFile(data);
  }

  removeUser(id: number): void {
    const data = this.readDataFromFile();
    const index = data.users.findIndex((u) => u.id === id);
    data.users.splice(index, 1);
    this.writeDataToFile(data);
  }

  private readDataFromFile(): { users: User[] } {
    const rawData = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(rawData);
  }

  private writeDataToFile(data: { users: User[] }): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}
