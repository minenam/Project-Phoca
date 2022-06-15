import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { JWTConstants } from "src/auth/constants";
import { UserController } from "./user.controller";
import { Users } from "./user.entity";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: JWTConstants.secret,
      signOptions: {
        expiresIn: JWTConstants.expireIn,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}
