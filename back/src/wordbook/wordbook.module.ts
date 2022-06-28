import { Module } from "@nestjs/common";
import { WordbookController } from "./wordbook.controller";
import { WordbookService } from "./wordbook.service";
import { Wordbook } from "./wordbook.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WordService } from "../word/word.service";
import { Word } from "../word/word.entity";

@Module({
  controllers: [WordbookController],
  providers: [WordbookService, WordService],
  imports: [
    TypeOrmModule.forFeature([Wordbook, Word]),
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
  ],
})
export class WordbookModule {}
