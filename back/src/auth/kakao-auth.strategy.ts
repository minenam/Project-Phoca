import { PassportStrategy } from "@nestjs/passport";
// import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { Users } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, Strategy } from "passport-kakao";

@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor(
    configService: ConfigService,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
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
    const { provider, id, _raw, _json } = profile;

    const payload = {
      provider,
      providerId: id,
      raw: _raw,
      _json: _json,
    };
    done(null, payload);
  }
}
