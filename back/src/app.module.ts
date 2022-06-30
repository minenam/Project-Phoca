import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { configAsync } from "./orm.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WordbookModule } from "./wordbook/wordbook.module";
import { WordModule } from "./word/word.module";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { QuizModule } from "./quiz/quiz.module";
import { MailerModule } from "@nestjs-modules/mailer";
import emailConfig from "./config/email.confg";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
      load: [emailConfig],
    }),
    TypeOrmModule.forRootAsync(configAsync),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get("email"),
        };
      },
    }),
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
