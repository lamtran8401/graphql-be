/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
  displayName?: Nullable<string>;
  password: string;
  username: string;
}

export class UpdateUserInput {
  displayName?: Nullable<string>;
  id: number;
  password?: Nullable<string>;
  username?: Nullable<string>;
}

export class User {
  displayName?: Nullable<string>;
  id: number;
  password: string;
  username: string;
}

export abstract class IQuery {
  abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;

  abstract users(): User[] | Promise<User[]>;
}

export abstract class IMutation {
  abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

  abstract updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;

  abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
