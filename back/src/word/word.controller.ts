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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { ImageService } from "./image.service";
import { TranslateService } from "./translate.service";
import { WordService } from "./word.service";
@ApiTags("단어 API")
@Controller("word")
export class WordController {
  constructor(
    private readonly imageService: ImageService,
    private readonly wordService: WordService,
    private readonly translateService: TranslateService,
  ) {}

  //단어장에 단어 저장
  @Post("/upload")
  @ApiOperation({
    summary: "단어 생성 API",
    description: "단어 정보를 입력받아 단어를 생성해서 DB에 저장한다.",
  })
  async chooseWord(@Body() createWordDto: CreateWordDto) {
    return await this.wordService.create(createWordDto);
  }

  //이미지 넣기
  @Post("/:wordEng")
  @ApiParam({
    name: "wordEng",
    type: "string",
    description: "영어 단어",
    required: true,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
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
  @ApiParam({
    name: "wordbookId",
    type: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  getAll(@Param("wordbookId") wordbookId: string) {
    return this.wordService.getAll(wordbookId);
  }

  // 단어 개별 조회
  @Get("/:wordId")
  @ApiParam({
    name: "wordId",
    type: "uuid",
    description: "단어 아이디",
    required: true,
  })
  get(@Param("wordId") wordId: string) {
    return this.wordService.get(wordId);
  }

  // 단어 수정
  @Patch("/:wordId")
  @ApiParam({
    name: "wordId",
    type: "uuid",
    description: "단어 아이디",
    required: true,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        wordEng: {
          type: "string",
          description: "영어 단어",
        },
        wordKor: {
          type: "string",
          description: "한글 단어",
        },
      },
    },
  })
  updateWord(
    @Param("wordId") wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    return this.wordService.update(wordId, updateWordDto);
  }

  // 이미지 삭제
  @Delete("image/:key")
  @ApiParam({
    name: "key",
    type: "string",
    description: "AWS S3 이미지 키(삭제 시 필요)",
    required: true,
  })
  async deleteImage(@Param("key") key: string) {
    return await this.imageService.deleteImage(key);
  }
  // 단어 삭제
  @Delete("/:wordId")
  @ApiParam({
    name: "wordId",
    type: "uuid",
    description: "영어 아이디",
    required: true,
  })
  async deleteWord(@Param("wordId") wordId: string) {
    const key = await this.wordService.deleteWord(wordId);
    return await this.imageService.deleteImage(key);
  }
}
