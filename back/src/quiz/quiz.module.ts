import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { QuizController } from "./quiz.controller";
import { QuizService } from "./quiz.service";

@Module({
  imports: [
    MulterModule.register({
      dest: "./images",
    }),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
