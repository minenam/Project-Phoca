import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../user/user.entity";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth.credential.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { LoginUserInfo } from "../user/dto/login-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  // 계정 비밀번호 암호화
  async hashedUser(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // 임시 비밀번호 발급
  generateTempPassword() {
    const tempPassword = Math.floor(Math.random() * 10 ** 8)
      .toString()
      .padStart(8, "0");
    return tempPassword;
  }

  // payload와 유저 정보로 토큰 발급 및 결과 반환
  async validatelogin(payload, user: Users) {
    const accessToken = this.jwtService.sign({
      payload,
      expiresIn: 60000 * 10,
    });
    const { password, joinedAt, lastloginedAt, activated, ...userInfo } = user;
    return {
      statusCode: 201,
      message: "로그인 성공",
      data: userInfo,
      token: accessToken,
    };
  }

  // 로컬에서 로그인 검증
  async validateUser(
    authcredntialDto: AuthCredentialDto,
  ): Promise<LoginUserInfo> {
    const { email, password } = authcredntialDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.userId };

      const result = await this.validatelogin(payload, user);
      return result;
    } else {
      throw new UnauthorizedException("로그인 실패");
    }
  }

  // 카카오 로그인
  async kakaoLogin(user: Users) {
    console.log(user);
    const email = user.email;
    const found = await this.userRepository.findOneBy({ email });

    if (found) {
      const payload = {
        email: found.email,
        sub: found.userId,
      };
      const result = await this.validatelogin(payload, user);
      return result;
    } else {
      throw new UnauthorizedException("로그인 실패");
    }
  }
}
