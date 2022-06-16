import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMconfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [".env"],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
