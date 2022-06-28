import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { configAsync } from "./orm.config";
import { ConfigModule } from "@nestjs/config";
import { WordbookModule } from "./wordbook/wordbook.module";
import { WordModule } from "./word/word.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { QuizModule } from "./quiz/quiz.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync(configAsync),
    UserModule,
    AuthModule,
    WordbookModule,
    WordModule,
    BookmarkModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
