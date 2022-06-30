import { Controller, Get, Logger, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { KakaoAuthGuard } from "./kakao-auth.guard";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";
import { GetUser } from "../user/user.decorator";

@Controller("auth")
@ApiTags("Oauth API")
export class AuthController {
  private logger = new Logger("AuthController");
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // 카카오 로그인 엔드포인트
  @Get("kakao/login")
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: "카카오 로그인" })
  kakaoLogin(): void {
    return;
  }

  // 인가 코드로 토큰 받기
  @Get("kakao/redirect")
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: "카카오 로그인 Redirect로 토큰 발급" })
  async kakaoLoginRedirect(@GetUser() user, @Res() res: Response) {
    this.logger.verbose(`GET /kakao/redirect : 카카오 로그인 리다이렉트`);
    const result = await this.authService.kakaoLogin(user);
    res.redirect(`http://localhost:3000/login/kakao?token=${result.token}`);
  }
}
