import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/user/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWTConstants } from "./constants";
import { JWTStrategy } from "./jwt.strategy";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: JWTConstants.secret,
      signOptions: {
        expiresIn: JWTConstants.expireIn,
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
