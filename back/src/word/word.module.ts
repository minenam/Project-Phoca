import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImageService } from "./image.service";
import { TranslateService } from "./translate.service";
import { WordController } from "./word.controller";
import { Word } from "./word.entity";
import { WordService } from "./word.service";

@Module({
  controllers: [WordController],
  providers: [WordService, ImageService, TranslateService],
  imports: [TypeOrmModule.forFeature([Word])],
})
export class WordModule {}
