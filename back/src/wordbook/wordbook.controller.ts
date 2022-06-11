import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { WordbookService } from "./wordbook.service";
import { Wordbook } from "./wordbook.entity";

@Controller("wordbook")
export class WordbookController {
  constructor(private wordbookService: WordbookService) {}
  @Get()
  getAll() {
    return this.wordbookService.getAll();
  }
  @Post("create")
  create(@Body() wordbook: Wordbook) {
    return this.wordbookService.create(wordbook);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.wordbookService.get(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() wordbook: Wordbook) {
    return this.wordbookService.update(id, wordbook);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.wordbookService.delete(id);
  }
}
