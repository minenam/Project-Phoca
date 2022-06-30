import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./user.entity";
import { AuthCredentialDto } from "../auth/dto/auth.credential.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/auth.guard";
import { GetUser } from "./user.decorator";
import { ParamUserDto } from "./dto/param-user.dto";
import { LoginUserInfo } from "../user/dto/login-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserInfo } from "./dto/user-info.dto";

@Controller("user")
@ApiTags("회원(유저) API")
@UsePipes(ValidationPipe)
export class UserController {
  private logger = new Logger("UserController");
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "[테스트용] 전체 유저 조회 API" })
  usersList(): Promise<Users[]> {
    return this.userService.getAll();
  }

  // 유저 회원가입 /user/register
  @Post("register")
  @ApiOperation({ summary: "회원가입 API" })
  register(@Body() createUserDto: CreateUserDto): Promise<UserInfo> {
    this.logger.verbose(`Try to Register: Username ${createUserDto.userName}`);
    return this.userService.register(createUserDto);
  }

  // 유저 로그인 /user/login
  @Post("login")
  @ApiOperation({ summary: "로그인 API (토큰발급)" })
  login(@Body() authCredentialDto: AuthCredentialDto): Promise<LoginUserInfo> {
    this.logger.verbose(`Try to Login: User Email ${authCredentialDto.email}`);
    return this.userService.login(authCredentialDto);
  }

  // 현재 로그인 유저 정보 조회 user/current
  @UseGuards(JwtAuthGuard)
  @Get("current")
  @ApiOperation({ summary: "현재 로그인 유저 정보 조회 API" })
  @ApiBearerAuth("accesskey")
  getCurrentUser(@GetUser() user): Promise<UserInfo> {
    const userId = user.payload.sub;
    this.logger.verbose(`Current Login User ID: ${userId}`);
    return this.userService.getUserById(userId);
  }

  // 특정 유저 정보 조회 user/:userId
  @UseGuards(JwtAuthGuard)
  @Get(":userId")
  @ApiOperation({ summary: "특정 유저 정보 조회 API" })
  @ApiBearerAuth("accesskey")
  getUserById(
    @Param() paramUserDto: ParamUserDto,
    @GetUser() user,
  ): Promise<UserInfo> {
    const { userId } = paramUserDto;
    if (userId !== user.payload.sub) {
      throw new BadRequestException(`토큰과 유저ID가 일치하지 않습니다.`);
    }
    const found = this.userService.getUserById(userId);
    return found;
  }

  // 유저 계정 삭제 user/:userId
  @UseGuards(JwtAuthGuard)
  @Delete(":userId")
  @ApiOperation({ summary: "특정 유저 삭제 API" })
  @ApiBearerAuth("accesskey")
  withdraw(
    @Param() paramUserDto: ParamUserDto,
    @GetUser() user,
  ): Promise<string> {
    const { userId } = paramUserDto;
    if (userId !== user.payload.sub) {
      throw new BadRequestException(`토큰과 유저ID가 일치하지 않습니다.`);
    }
    this.logger.verbose(`Try to Withdraw: UserID ${userId}`);
    return this.userService.deleteUser(userId);
  }

  // 유저 정보(이름, 코멘트, 이미지) 수정 user/:userId
  @UseGuards(JwtAuthGuard)
  @Patch(":userId")
  @ApiOperation({ summary: "특정 유저 정보 수정 API" })
  @ApiBearerAuth("accesskey")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        userName: { type: "string" },
        comment: { type: "string" },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async updateUser(
    @Param() paramUserDto: ParamUserDto,
    @GetUser() user,
    @Body("userName") userName: string,
    @Body("comment") comment: string,
    @UploadedFile("file") file: Express.Multer.File,
  ): Promise<Users> {
    const { userId } = paramUserDto;
    if (userId !== user.payload.sub) {
      throw new BadRequestException(`토큰과 유저ID가 일치하지 않습니다.`);
    }
    const updateUserInfo = { userName, comment, file };
    this.logger.verbose(`Try to update info: UserId ${userId}`);
    if (updateUserInfo) {
      return await this.userService.updateUser(userId, updateUserInfo);
    }
  }

  // Token 만료 확인 (유효기간 10분)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "[테스트용] 토큰 만료 API" })
  @ApiBearerAuth("accesskey")
  @Post("token")
  async token(@GetUser() user) {
    try {
      this.logger.verbose(`Try to Confirm: User ${user.email}`);
      return "현재 사용 가능한 토큰";
    } catch (e) {
      throw new Error("사용할 수 없는 토큰");
    }
  }
}
