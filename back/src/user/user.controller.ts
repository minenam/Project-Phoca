import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./user.entity";
import { AuthCredentialDto } from "../auth/dto/auth.credential.dto";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("user")
@ApiTags("User")
export class UserController {
  private logger = new Logger("UserController");
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "[테스트용] 전체 유저 조회 API" })
  usersList(): Promise<Users[]> {
    return this.userService.getAll();
  }

  // 유저 회원가입 /user/register
  @Post("/register")
  @ApiOperation({ summary: "회원가입 API" })
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto): Promise<string> {
    this.logger.verbose(`Try to Register: Username ${createUserDto.userName}`);
    return this.userService.register(createUserDto);
  }

  // 유저 로그인 /user/login
  @Post("/login")
  @ApiOperation({ summary: "로그인 API (토큰발급)" })
  @UsePipes(ValidationPipe)
  login(
    @Body() authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(`Try to Login: User Email ${authCredentialDto.email}`);
    return this.userService.login(authCredentialDto);
  }

  // 특정 유저 정보 조회 user/:userId
  @Get("/:userId")
  @ApiOperation({ summary: "특정 유저 정보 조회 API" })
  getUserById(@Param("userId", ParseUUIDPipe) userId): Promise<Users> {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`can't find userid ${userId}`);
    }
    return user;
  }

  // 유저 계정 삭제 user/:userId
  @Delete("/:userId")
  @ApiOperation({ summary: "특정 유저 삭제 API" })
  withdraw(@Param("userId", ParseUUIDPipe) userId): Promise<void> {
    this.logger.verbose(`Try to Withdraw: UserID ${userId}`);
    return this.userService.deleteUser(userId);
  }

  // 유저 정보 수정 user/:userId
  @Patch("/:userId")
  @ApiOperation({ summary: "특정 유저 정보 수정 API" })
  updateUser(
    @Param("userId", ParseUUIDPipe) userId,
    @Body() createUserDto: CreateUserDto,
  ): Promise<Users> {
    this.logger.verbose(`Try to Update: UserID ${userId}`);
    return this.userService.updateUser(userId, createUserDto);
  }

  // userGuard 인가 테스트
  @Post("/test")
  @ApiOperation({ summary: "[테스트용] 토큰 권한 확인 API" })
  @UseGuards(AuthGuard())
  test(@Req() req) {
    this.logger.verbose(`Try to Request: User ${req.user.email}`);
  }
}
