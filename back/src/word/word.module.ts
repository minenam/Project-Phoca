import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageService } from "./image.service";
import { TranslateService } from "./translate.service";
import { WordController } from "./word.controller";
import { Word } from "./word.entity";
import { WordService } from "./word.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { WordCreatedListener } from "./listener/word-created.listener";
@Module({
  controllers: [WordController],
  providers: [WordService, ImageService, TranslateService, WordCreatedListener],
  imports: [
    EventEmitterModule.forRoot(),
    HttpModule,
    TypeOrmModule.forFeature([Word]),
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
export class WordModule {}
