import { Injectable } from "@nestjs/common";
import { MulterModuleOptions } from "@nestjs/platform-express";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quiz } from "./quiz.entity";
@Injectable()
export class QuizService {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: "./images",
    };
  }
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  async getRandom() {
    const words = await this.quizRepository.find();
    const randomWord = words[(Math.random() * (words.length - 1)).toFixed()];
    return randomWord;
  }
}
