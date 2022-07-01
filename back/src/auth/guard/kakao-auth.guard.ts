// import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class KakaoAuthGuard extends AuthGuard("kakao") {}
