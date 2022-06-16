import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { UserController } from "./user.controller";
import { Users } from "./user.entity";
import { UserService } from "./user.service";
import dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.JWTsecret,
      signOptions: {
        expiresIn: process.env.JWTexpiresIn,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
