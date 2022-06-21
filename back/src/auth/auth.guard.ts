import {
  Injectable,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new HttpException("No Token", HttpStatus.UNAUTHORIZED);
    }

    const token = authorization.replace("Bearer ", "");
    request.user = this.validateToken(token);
    return true;
  }

  validateToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY
      ? process.env.JWT_SECRET_KEY
      : "dev";

    try {
      // 토큰 정보로 유저 정보 변환
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      Logger.debug(`에러 메시지: ${e.mssage}`);
      switch (e.message) {
        // 토큰 오류 메시지
        case "INVALID_TOKEN":
        case "TOKEN_IS_ARRAY":
        case "NO_USER":
          throw new HttpException("유효하지 않은 토큰", 401);

        case "EXPIRED_TOKEN":
          throw new HttpException("토큰 만료", 410);

        default:
          throw new HttpException("서버 오류", 500);
      }
    }
  }
}
