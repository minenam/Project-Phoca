import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { WordbookService } from "./wordbook.service";
import { Wordbook } from "./wordbook.entity";
import { UpdateWordbookDto } from "./dto/update-wordbook.dto";
import { CreateWordbookDto } from "./dto/create-wordbook.dto";

@Controller("wordbook")
export class WordbookController {
  constructor(private wordbookService: WordbookService) {}
  @Get()
  getAll() {
    return this.wordbookService.getAll();
  }
  @Post("create")
  create(@Body() createWordbookDto: CreateWordbookDto) {
    return this.wordbookService.create(createWordbookDto);
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.wordbookService.get(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWordbookDto: UpdateWordbookDto,
  ) {
    return this.wordbookService.update(id, updateWordbookDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.wordbookService.delete(id);
  }
}
