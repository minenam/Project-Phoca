import { Module } from "@nestjs/common";
import { WordbookController } from "./wordbook.controller";
import { WordbookService } from "./wordbook.service";
import { Wordbook } from "./wordbook.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [WordbookController],
  providers: [WordbookService],
  imports: [TypeOrmModule.forFeature([Wordbook])],
})
export class WordbookModule {}
