import { PassportStrategy } from "@nestjs/passport";
// import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { Users } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, Strategy } from "passport-kakao";
import { AuthService } from "./auth.service";

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
      // "scope":"account_email openid profile_nickname"
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done,
  ) {
    console.log(profile);
    const email = profile._json.kakao_account.email;
    const username = profile._json.properties.nickname;
    const provider = profile.provider;
    const userInfo = {
      email,
      username,
      provider,
    };

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      // 토큰 발급
      return this.authService.kakaoLogin(userInfo);
    }
  }
}
