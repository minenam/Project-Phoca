import { Controller, Get } from "@nestjs/common";

import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { QuizService } from "./quiz.service";

@ApiTags("퀴즈 API")
@Controller("quiz")
export class QuizController {
  constructor(private quizService: QuizService) {}

  @ApiOperation({
    summary: "그림 퀴즈 API",
    description: "랜덤 그림 단어 API.",
  })
  @Get()
  @ApiOperation({
    summary: "그림 퀴즈 단어 조회 API",
    description: "무작위 퀴즈 단어를 조회.",
  })
  getRandom() {
    const word = this.quizService.getRandom();
    return word;
  }
}
