import { PassportStrategy } from "@nestjs/passport";
// import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { Users } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, Strategy } from "passport-kakao";
import { AuthService } from "./auth.service";
// import * as bcrypt from "bcrypt";
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
      // scope: "kakao_account.email properties.nickname provider",
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done,
  ) {
    // console.log(profile);
    const userId = profile.id;
    const email = profile._json.kakao_account.email;
    const userName = profile._json.properties.nickname;
    const provider = profile.provider; // "kakao"
    const userImage = profile._json.properties.profile_image
      ? profile._json.properties.profile_image
      : undefined;
    const joinedAt = profile._json.connected_at;

    const password = await this.authService.hashedUser(userId);

    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      const newUser = {
        userId: randomUUID(),
        userName,
        email,
        password,
        userImage,
        provider,
        joinedAt,
      };
      await this.userRepository.save(newUser);
    }
    return done(null, profile, { accessToken, refreshToken });
  }
}
