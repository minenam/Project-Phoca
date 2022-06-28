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
import { LoginUserInfo } from "../user/dto/login-user.dto";
import { ImageMiddleware } from "../middleware/image.middleware";
import { UserInfo } from "./dto/user-info.dto";

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
  async register(createUserDto: CreateUserDto): Promise<UserInfo> {
    const { userName, email, password } = createUserDto;
    // 이메일 중복확인
    const foundEmail = await this.userRepository.findOneBy({ email });
    if (foundEmail) {
      throw new ConflictException(
        `이미 존재하는 이메일입니다. 다시 입력해주세요.`,
      );
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
      message: "회원가입 성공",
      data: userInfo,
    };
  }

  // 유저 로그인 (토큰 생성)
  async login(authcredntialDto: AuthCredentialDto): Promise<LoginUserInfo> {
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
  async getUserById(userId: string): Promise<UserInfo> {
    const getUser = await this.userRepository.findOneBy({ userId });

    if (!getUser) {
      throw new NotFoundException(`존재하지 않는 회원입니다.`);
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
      message: "회원 정보 수정 완료",
      data: userInfo,
    };
  }

  // 유저 계정 삭제
  async deleteUser(userId: string): Promise<string> {
    const found = await this.getUserById(userId);
    if (!found) {
      throw new NotFoundException(`Can't find user`);
    }
    await Promise.all([
      await this.imageMiddleware.deleteImage(found.data.userImage),
      await this.userRepository.delete({ userId }),
    ]);
    return `Good Bye, User :${found.data.userName}`;
  }

  // 유저 정보 (이름, 코멘트, 이미지) 수정
  async updateUser(userId: string, updateUserInfo) {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException(`존재하지 않는 회원입니다.`);
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
