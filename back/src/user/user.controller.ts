import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { User } from "./users.model";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  test(): User[] {
    return this.userService.getAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto): User {
    return this.userService.createUser(createUserDto);
  }

  @Get("/:userId")
  login(@Param("userId") userId: string): User {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException("login is failed");
    }
    console.log(`login is successed`);
    return user;
  }

  @Delete("/:userId")
  withdraw(@Param("userId") userId: string): void {
    this.userService.deleteUser(userId);
    console.log(`withdraw : ${userId}`);
  }

  @Patch("/:userId")
  updateUser(
    @Param("userId") userId: string,
    @Body() createUserDto: CreateUserDto,
  ): User {
    console.log(`update : ${createUserDto.userName}`);
    return this.userService.updateUser(userId, createUserDto);
  }
}
