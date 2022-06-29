import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../user/user.entity";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth.credential.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginUserInfo } from "../user/dto/login-user.dto";
import { Profile } from "passport-kakao";

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

  // 로그인시 유저 비밀번호 확인 및 JWT 생성
  async validateUser(authcredntialDto: AuthCredentialDto): Promise<LoginUserInfo> {
    const { email, password } = authcredntialDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.userId };
      const accessToken = this.jwtService.sign({
        payload,
        expiresIn: 60000 * 10,
      });

      const { password, provider, joinedAt, lastloginedAt, activated, ...userInfo } = user;
      return {
        statusCode: 201,
        message: "로그인 성공",
        data: userInfo,
        token: accessToken,
      };
    } else {
      throw new UnauthorizedException("로그인 실패");
    }
  }

  // 카카오 로그인
  async kakaoLogin(user: Profile) {
    const email = user._json.kakao_account.email;
    const found = await this.userRepository.findOneBy({ email });

    if (found) {
      const payload = {
        email: found.email,
        sub: found.userId,
      };
      const accessToken = this.jwtService.sign({ payload });
      const { password, joinedAt, lastloginedAt, activated, ...userInfo } =
        found;
      return {
        statusCode: 201,
        message: "로그인 성공",
        data: userInfo,
        token: accessToken,
      };
    } else {
      throw new UnauthorizedException("로그인 실패");
    }
  }
}
