import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { AuthCredentialDto } from "../auth/dto/auth.credential.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private authService: AuthService,
  ) {}

  async getAll(): Promise<Users[]> {
    const userList = await this.userRepository.find();
    return userList;
  }

  // 유저 생성 (회원가입)
  async register(createUserDto: CreateUserDto): Promise<string> {
    const { userName, email, password } = createUserDto;
    const hashedPassword = await this.authService.hashedUser(password);
    const user = this.userRepository.create({
      username: userName,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new NotFoundException(`can't find username ${userName}`);
    }
    await this.userRepository.save(user);

    return `Welcome to Phoca, ${user.username}`;
  }

  // 유저 검증 (로그인)
  async login(authcredntialDto: AuthCredentialDto): Promise<any> {
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
  async getUserById(userId: string): Promise<Users> {
    const getUser = await this.userRepository.findOneBy({ userid: userId });

    if (!getUser) {
      throw new NotFoundException(`can't find userid ${userId}`);
    }
    return getUser;
  }

  // 유저 계정 삭제
  async deleteUser(userId: string): Promise<void> {
    const result = await this.userRepository.delete({ userid: userId });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't fond Board with userid ${userId}`);
    }
  }

  // 유저 정보 (이름, 이메일, 비밀번호) 수정
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
