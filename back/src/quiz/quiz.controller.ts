import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { diskStorage } from "multer";
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

  // 프론트에서 받은 이미지를 플라스크 서버에 post?
  // @ApiOperation({
  //   summary: "그림 업로드 API",
  //   description: "저장된 그림 파일 업로드.",
  // })
  // @ApiConsumes("multipart/form-data")
  // @ApiBody({
  //   schema: {
  //     type: "object",
  //     properties: {
  //       file: {
  //         type: "string",
  //         format: "binary",
  //       },
  //     },
  //   },
  // })
  // @Post("upload")
  // @UseInterceptors(
  //   FileInterceptor("file", {
  //     storage: diskStorage({
  //       destination: "./images",
  //       filename: function (req, file, callback) {
  //         callback(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // uploadQuiz(@UploadedFile() file: Express.Multer.File) {
  //   console.log(file);
  //   const response = {
  //     originalname: file.originalname,
  //     filename: file.filename,
  //   };
  //   return response;
  // }
}
