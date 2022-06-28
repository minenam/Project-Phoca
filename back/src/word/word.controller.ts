import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/auth.guard";
import { BodyWordDto } from "./dto/body-word.dto";
import { ParamWordDto } from "./dto/param-word.dto";
import { ImageService } from "./image.service";
import { TranslateService } from "./translate.service";
import { Word } from "./word.entity";
import { WordService } from "./word.service";

@ApiTags("단어 API")
@Controller("word")
export class WordController {
  constructor(
    private readonly imageService: ImageService,
    private readonly wordService: WordService,
    private readonly translateService: TranslateService,
  ) {}

  //이미지 넣기
  @Post("/upload")
  @ApiOperation({
    summary: "단어 저장 API",
    description: "이미지를 입력받아 단어 데이터를 생성해서 저장한다.",
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
  async uploadWord(@UploadedFile() file: Express.Multer.File) {
    const { wordEng, wordKey } = await this.imageService.uploadImage(file);
    const wordKor = [];
    for (const word of wordEng) {
      const kor = await this.translateService.translate(word, "ko", "en");
      wordKor.push(kor);
    }
    return await this.wordService.create({
      wordEng,
      wordKor,
      wordKey,
    });
  }

  // 단어장의 단어 전체 조회

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("accesskey")
  @Get("all/:wordbookId")
  @ApiOperation({
    summary: "단어장 단어 조회 API",
    description: "단어장 아이디를 입력받아 단어들을 조회.",
  })
  getAll(@Param() paramWordDto: ParamWordDto) {
    const { wordbookId } = paramWordDto;
    return this.wordService.getAll(wordbookId);
  }

  // 카드 뒤집기 게임용 단어 단어장에서 추출

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("accesskey")
  @Get("game/:wordbookId")
  @ApiOperation({
    summary: "카드 뒤집기 단어 조회 API",
    description: "단어장 아이디를 입력받아 단어들을 조회.",
  })
  @ApiParam({
    name: "wordbookId",
    type: Word["wordbookId"],
    format: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  async getWords(@Param("wordbookId") wordbookId: string) {
    const wordCount = await this.wordService.countWord(wordbookId);
    if (wordCount < 8) {
      return `게임을 하기 위해서는 최소 8개의 단어가 있어야 합니다. 현재 단어의 수는 ${wordCount}개 입니다. `;
    }
    return await this.wordService.getRandomWord(wordbookId);
  }

  // 단어 개별 조회

  @Get("/:wordId")
  @ApiOperation({
    summary: "단어 조회 API",
    description: "단어 아이디를 입력받아 단어 정보를 조회.",
  })
  @ApiParam({
    name: "wordId",
    type: Word["wordId"],
    format: "uuid",
    description: "단어 아이디",
    required: true,
  })
  get(@Param("wordId") wordId: string) {
    return this.wordService.get(wordId);
  }

  // 단어 수정

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("accesskey")
  @Patch("/:wordId")
  @ApiOperation({
    summary: "단어 수정 API",
    description: "단어 아이디와 수정 내용을 입력받아 단어 내용을 수정한다.",
  })
  @ApiParam({
    name: "wordId",
    type: Word["wordId"],
    format: "uuid",
    description: "단어 아이디",
    required: true,
  })
  updateWord(
    @Param("wordId") wordId: string,
    @Body() bodyWordDto: BodyWordDto,
  ) {
    return this.wordService.update(wordId, bodyWordDto);
  }

  // 단어 삭제
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("accesskey")
  @Delete("/:wordId")
  @ApiOperation({
    summary: "단어 삭제 API",
    description: "단어 아이디를 입력받아 단어 정보를 삭제한다.",
  })
  @ApiParam({
    name: "wordId",
    type: Word["wordId"],
    format: "uuid",
    description: "영어 아이디",
    required: true,
  })
  async deleteWord(@Param("wordId") wordId: string) {
    const key = await this.wordService.deleteWord(wordId);
    try {
      await this.imageService.deleteImage(key);
    } catch (e) {
      console.log(e);
      return new BadRequestException("이미지 삭제 실패");
    }
    return "단어가 삭제되었습니다.";
  }
}
