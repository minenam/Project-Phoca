import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { Users } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, Strategy } from "passport-kakao";
import { AuthService } from "./auth.service";
import { randomUUID } from "crypto";

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor(
    configService: ConfigService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly authService: AuthService,
  ) {
    super({
      // Put config in `.env`
      clientID: configService.get<string>("OAUTH_KAKAO_ID"),
      clientSecret: configService.get<string>("OAUTH_KAKAO_SECRET"),
      callbackURL: configService.get<string>("OAUTH_KAKAO_REDIRECT_URL"),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done,
  ) {
    // 카카오 유저 데이터 받아오기
    const userId = profile.id;
    const email = profile._json.kakao_account.email;
    const userName = profile._json.properties.nickname;
    const provider = profile.provider; // "kakao"
    const userImage = profile._json.properties.profile_image
      ? profile._json.properties.profile_image
      : undefined;
    const lastloginedAt = profile._json.connected_at;

    // 비밀번호는 kakao.id 를 암호화
    const password = await this.authService.hashedUser(userId.toString());

    const found = await this.userRepository.findOneBy({ email });

    if (!found) {
      const newUser = {
        userId: randomUUID(),
        userName,
        email,
        password,
        userImage,
        provider,
        lastloginedAt,
      };
      // 신규 회원의 경우, DB에 새로 만들어서 유저 저장
      await this.userRepository.save(newUser);
      return newUser;
    }
    return found;
  }
}
