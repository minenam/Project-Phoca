import { Injectable } from "@nestjs/common";
import { MulterModuleOptions } from "@nestjs/platform-express";

@Injectable()
export class QuizService {
  createMulterOptions(): MulterModuleOptions {
    return {
      dest: "./images",
    };
  }
}
