import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./user.entity";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  test(): Promise<Users[]> {
    return this.userService.getAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.userService.createUser(createUserDto);
  }

  @Get("/:userId")
  getUserById(@Param("userId", ParseUUIDPipe) userId): Promise<Users> {
    const user = this.userService.getUserById(userId);
    if (!user) {
      console.log("login is failed");
      throw new NotFoundException(`can't find userid ${userId}`);
    }
    console.log("login is successed");
    return user;
  }

  @Delete("/:userId")
  withdraw(@Param("userId", ParseUUIDPipe) userId): Promise<void> {
    console.log(`withdraw : ${userId}`);
    return this.userService.deleteUser(userId);
  }

  @Patch("/:userId")
  updateUser(
    @Param("userId", ParseUUIDPipe) userId,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Users> {
    console.log(`update : ${createUserDto.userName}`);
    return this.userService.updateUser(userId, createUserDto);
  }
}
