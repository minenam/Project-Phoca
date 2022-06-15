import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./users.model";
import { v4 as uuid } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  createUser(createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;
    const user: User = {
      userId: uuid(),
      userName,
      email,
      password,
      provider: "local",
      joinedAt: new Date(),
      lastloginedAt: new Date(),
      activated: true,
    };

    this.users.push(user);
    return user;
  }

  getUserById(userId: string): User {
    const user = this.users.find((user) => user.userId === userId);

    if (!user) {
      throw new NotFoundException(`userId ${userId} 를 찾을 수 없습니다.`);
    }
    return user;
  }

  deleteUser(userId: string): void {
    const getUser = this.getUserById(userId);
    this.users = this.users.filter((user) => user.userId !== getUser.userId);
  }

  updateUser(userId: string, createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;
    const user = this.users.find((user) => user.userId === userId);
    user.userName = userName;
    user.email = email;
    user.password = password;
    return user;
  }
}
