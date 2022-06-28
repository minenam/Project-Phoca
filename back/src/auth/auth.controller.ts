import {
  Controller,
  Get,
  Header,
  Logger,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
// import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { KakaoAuthGuard } from "./kakao-auth.guard";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("auth/kakao")
@ApiTags("Oauth API")
export class AuthController {
  private logger = new Logger("AuthController");
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  // 인가 코드 받기
  @Get("login")
  // @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: "카카오 로그인 요청" })
  async kakaoLogin(@Res() _res): Promise<void> {
    const _loginURL = this.configService.get<string>("OAUTH_KAKAO_LOGIN");
    return _res.redirect(_loginURL);
    // https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}
  }

  // 인가 코드로 토큰 받기
  @Get("redirect")
  @UseGuards(KakaoAuthGuard)
  @ApiOperation({ summary: "카카오 로그인 Redirect" })
  async kakaoLoginRedirect(@Req() req, @Res() res: Response) {
    // const _TokenURL = `${this.configService.get<string>(
    //   "OAUTH_KAKAO_TOKEN",
    // )}&code=${qs.code}`;
    this.logger.verbose(`GET /kakao/redirect : 카카오 로그인 리다이렉트!`);
    console.log(req);
    return this.authService.kakaoLogin(req.user);
  }

  // 프론트엔드 로그인 테스트
  @Get("front")
  @Header("Content-Type", "text/html")
  getLoginPage(): string {
    return `
    <div>
      <h3>카카오 로그인</h3>
      
      <form action="/auth/kakao/login" method="GET">
        <input type="submit" value="카카오 로그인" />
      </form>
      
      <form action="/auth/kakao/logout" method="GET">
        <input type="submit" value="카카오 로그아웃" />
      </form>
      `;
  }

  @Get("logout")
  @Header("Content-Type", "text/html")
  getLogoutPage(): string {
    return `
    <div>
      <h3>카카오 로그아웃</h3>
      
      <form action="/auth/kakao/login" method="GET">
        <input type="submit" value="카카오 로그인" />
      </form>
      
      <form action="/auth/kakao/logout" method="GET">
        <input type="submit" value="카카오 로그아웃" />
      </form>
      `;
  }

}
