import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./jwt.strategy";
import dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWTsecret,
      signOptions: {
        expiresIn: process.env.JWTexpiresIn,
      },
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, JWTStrategy],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
