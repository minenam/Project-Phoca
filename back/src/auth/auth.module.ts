import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../user/user.entity";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./auth.controller";
import { KakaoAuthStrategy } from "./strategy/kakao-auth.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>("JWT_SECRET_KEY"),
          signOptions: {
            expiresIn: configService.get<string>("JWT_EXPIRESIN"),
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy, KakaoAuthStrategy],
  exports: [AuthService, PassportModule, JWTStrategy],
})
export class AuthModule {}
