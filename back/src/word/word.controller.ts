import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateWordDto } from "./dto/update-word.dto";
import { ImageService } from "./image.service";
import { TranslateService } from "./translate.service";
import { WordService } from "./word.service";

@Controller("word")
export class WordController {
  constructor(
    private readonly imageService: ImageService,
    private readonly wordService: WordService,
    private readonly translateService: TranslateService,
  ) {}

  // 단어 전체 조회
  @Get("all/:wordbookId")
  getAll(@Param("wordbookId") wordbookId: string) {
    return this.wordService.getAll(wordbookId);
  }

  // 단어 개별 조회
  @Get("/:wordId")
  get(@Param("wordId") wordId: string) {
    return this.wordService.get(wordId);
  }

  // 단어 생성
  @Post("/:wordbookId/:wordEng")
  @UseInterceptors(FileInterceptor("file"))
  @UsePipes(new ValidationPipe({ transform: true }))
  async uploadWord(
    @UploadedFile() file: Express.Multer.File,
    @Param("wordbookId") wordbookId: string,
    @Param("wordEng") wordEng: string,
  ) {
    const wordImage = await this.imageService.uploadImage(file);
    //const wordEng = "test";
    const wordKor = await this.translateService.translate(wordEng, "ko", "en");
    const word = { wordbookId, wordEng, wordKor, wordImage };
    return this.wordService.create(word);
  }

  // 단어 수정
  @Patch("/:wordId")
  updateWord(
    @Param("wordId") wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    return this.wordService.update(wordId, updateWordDto);
  }
}

//   // @Delete("/:wordId")
//   // deleteWord(@Param("wordId") wordId: string) {
//   //   return this.wordService.deleteWord(wordId);
//   // }
// }
