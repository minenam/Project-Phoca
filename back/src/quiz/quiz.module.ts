import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuizController } from "./quiz.controller";
import { Quiz } from "./quiz.entity";
import { QuizService } from "./quiz.service";

@Module({
  imports: [
    MulterModule.register({
      dest: "./images",
    }),
    TypeOrmModule.forFeature([Quiz]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
