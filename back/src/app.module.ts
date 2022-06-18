import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { typeORMconfig } from "./config/typeorm.config";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { configAsync } from "./orm.config";
import { ConfigModule } from "@nestjs/config";
import { WordbookModule } from "./wordbook/wordbook.module";
import { WordModule } from "./word/word.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync(configAsync),
    // TypeOrmModule.forRoot(typeORMconfig),
    UserModule,
    AuthModule,
    WordbookModule,
    WordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
