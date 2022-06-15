import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { WordService } from "./word.service";

@Controller("word")
export class WordController {
  constructor(private readonly wordService: WordService) {}

  // @Get("/:wordbookId")
  // getAll() {
  //   return this.wordService.getAll();
  // }
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.wordService.uploadImage(file);
  }

  @Delete("/:key")
  deleteImage(@Param("key") key: string) {
    return this.wordService.deleteImage(key);
  }
}
