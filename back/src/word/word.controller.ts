import {
  Body,
  Controller,
  Delete,
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
import { CreateWordDto } from "./dto/create-word.dto";
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

  //단어장에 단어 저장
  @Post("/upload")
  async chooseWord(@Body() createWordDto: CreateWordDto) {
    return await this.wordService.create(createWordDto);
  }

  //이미지 넣기
  @Post("/:wordEng")
  @UseInterceptors(FileInterceptor("file"))
  @UsePipes(new ValidationPipe({ transform: true }))
  async uploadWord(
    @UploadedFile() file: Express.Multer.File,
    @Param("wordEng") wordEng: string,
  ) {
    const { wordImage, wordKey } = await this.imageService.uploadImage(file);
    const wordKor = await this.translateService.translate(wordEng, "ko", "en");
    const eng = [wordEng, wordEng, wordEng];
    const kor = [wordKor, wordKor, wordKor];
    return { eng, kor, wordImage, wordKey };
  }

  // 단어장의 단어 전체 조회
  @Get("all/:wordbookId")
  getAll(@Param("wordbookId") wordbookId: string) {
    return this.wordService.getAll(wordbookId);
  }

  // 단어 개별 조회
  @Get("/:wordId")
  get(@Param("wordId") wordId: string) {
    return this.wordService.get(wordId);
  }

  // 단어 수정
  @Patch("/:wordId")
  updateWord(
    @Param("wordId") wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    return this.wordService.update(wordId, updateWordDto);
  }

  // 이미지 삭제
  @Delete("image/:key")
  async deleteImage(@Param("key") key: string) {
    return await this.imageService.deleteImage(key);
  }
  // 단어 삭제
  @Delete("/:wordId")
  async deleteWord(@Param("wordId") wordId: string) {
    const key = await this.wordService.deleteWord(wordId);
    return await this.imageService.deleteImage(key);
  }
}
