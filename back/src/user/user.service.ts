import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { AuthCredentialDto } from "../auth/dto/auth.credential.dto";
import { LoginUserInfoType } from "../user/dto/login-user.dto";
import { ImageMiddleware } from "../middleware/image.middleware";
import { UserInfoType } from "./dto/user-info.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private authService: AuthService,
    private imageMiddleware: ImageMiddleware,
  ) {}

  async getAll(): Promise<Users[]> {
    const userList = await this.userRepository.find();
    return userList;
  }

  // 유저 생성 (회원가입)
  async register(createUserDto: CreateUserDto): Promise<UserInfoType> {
    const { userName, email, password } = createUserDto;
    // 이메일 중복확인
    const foundEmail = await this.userRepository.findOneBy({ email });
    if (foundEmail) {
      throw new ConflictException(`Already exist ${email}`);
    }
    // 새로운 유저 저장
    const hashedPassword = await this.authService.hashedUser(password);
    const user = this.userRepository.create({
      userName,
      email,
      password: hashedPassword,
    });
    const result = await this.userRepository.save(user);
    const userInfo = {
      userId: result.userId,
      userName: result.userName,
      email: result.email,
      comment: result.comment,
      userImage: result.userImage,
    };

    return {
      statusCode: 201,
      message: "success",
      data: userInfo,
    };
  }

  // 유저 로그인 (토큰 생성)
  async login(authcredntialDto: AuthCredentialDto): Promise<LoginUserInfoType> {
    const { email } = authcredntialDto;
    const user = await this.userRepository.findOneBy({ email });
    // 마지막 로그인일자 업데이트
    const now = new Date();
    user.lastloginedAt = now;
    await this.userRepository.save(user);
    // 토큰 생성
    const token = await this.authService.validateUser(authcredntialDto);
    return token;
  }

  // 유저 ID로 조회
  async getUserById(userId: string): Promise<UserInfoType> {
    const getUser = await this.userRepository.findOneBy({ userId });

    if (!getUser) {
      throw new NotFoundException(`can't find userid ${userId}`);
    }
    const {
      password,
      provider,
      joinedAt,
      lastloginedAt,
      activated,
      ...userInfo
    } = getUser;
    return {
      statusCode: 200,
      message: "success",
      data: userInfo,
    };
  }

  // 유저 계정 삭제
  async deleteUser(userId: string): Promise<string> {
    const found = await this.getUserById(userId);
    if (found) {
      await this.imageMiddleware.deleteImage(found.data.userImage);
    }
    const result = await this.userRepository.delete({ userId });
    console.log("result: ", result);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find user`);
    }
    return `Good Bye, User :${found.data.userName}`;
  }

  // 유저 정보 (이름, 코멘트, 이미지) 수정
  async updateUser(userId: string, updateUserInfo) {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`can't find user`);
    }
    const { userName, comment, file } = updateUserInfo;
    if (userName) {
      user.userName = userName;
    }
    if (comment) {
      user.comment = comment;
    }
    if (file) {
      const upload = await this.imageMiddleware.uploadImage(file);
      user.userImage = upload.Key;
    }
    await this.userRepository.save(user);

    return user;
  }
}
