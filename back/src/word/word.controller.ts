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
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { WordService } from "./word.service";

@Controller("word")
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get("all/:wordbookId")
  getAll(@Param("wordbookId") wordbookId: string) {
    return this.wordService.getAll(wordbookId);
  }

  @Get("/:wordId")
  get(@Param("wordId") wordId: string) {
    return this.wordService.get(wordId);
  }

  @Post("/create/:wordbookId")
  createWord(
    @Param("wordbookId") wordbookId: string,
    @Body("body") createWordDto: CreateWordDto,
  ) {
    return this.wordService.create(wordbookId, createWordDto);
  }
  @Post("/:wordbookId")
  @UseInterceptors(FileInterceptor("file"))
  uploadWord(
    @UploadedFile() file: Express.Multer.File,
    @Body() createWordDto: CreateWordDto,
    @Param("wordbookId") wordbookId: string,
  ) {
    return this.wordService.uploadWord(file, createWordDto, wordbookId);
  }

  @Patch("/:wordId")
  updateWord(
    @Param("wordId") wordId: string,
    @Body() updateWordDto: UpdateWordDto,
  ) {
    return this.wordService.update(wordId, updateWordDto);
  }

  @Delete("/:wordId")
  deleteWord(@Param("wordId") wordId: string) {
    return this.wordService.deleteWord(wordId);
  }
}
