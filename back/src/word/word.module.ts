import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WordController } from "./word.controller";
import { Word } from "./word.entity";
import { WordService } from "./word.service";

@Module({
  controllers: [WordController],
  providers: [WordService],
  imports: [TypeOrmModule.forFeature([Word])],
})
export class WordModule {}
