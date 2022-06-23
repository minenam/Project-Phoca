import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../user/user.entity";
import { Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth.credential.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { LoginUserInfo } from "../user/dto/login-user.dto";
type LoginInfo = LoginUserInfo;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  // 계정 비밀번호 암호화
  async hashedUser(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  // 로그인시 유저 비밀번호 확인 및 JWT 생성
  async validateUser(authcredntialDto: AuthCredentialDto): Promise<LoginInfo> {
    const { email, password } = authcredntialDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, sub: user.userId };
      const accessToken = this.jwtService.sign(payload);

      const { password, ...userInfo } = user;
      return { ...userInfo, token: accessToken };
    } else {
      throw new UnauthorizedException("Login Failed");
    }
  }
}
