import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getAll(): Promise<Users[]> {
    const userList = await this.userRepository.find();
    return userList;
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { userName, email, password } = createUserDto;
    const user = this.userRepository.create({
      username: userName,
      email,
      password,
    });
    await this.userRepository.save(user);
    return user;
  }

  async getUserById(userId: string): Promise<Users> {
    const getUser = await this.userRepository.findOneBy({ userid: userId });

    if (!getUser) {
      throw new NotFoundException(`can't find userid ${userId}`);
    }
    return getUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.delete({ userid: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't fond Board with userid ${userId}`);
    }
  }

  async updateUser(userId: string, createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;
    const user = await this.getUserById(userId);

    user.username = userName;
    user.email = email;
    user.password = password;
    await this.userRepository.save(user);

    return user;
  }
}
