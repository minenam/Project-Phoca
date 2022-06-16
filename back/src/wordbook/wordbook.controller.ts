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
import { UpdateWordbookDto } from "./dto/update-wordbook.dto";
import { CreateWordbookDto } from "./dto/create-wordbook.dto";

@Controller("wordbook")
export class WordbookController {
  constructor(private wordbookService: WordbookService) {}
  //전체 단어장 조회
  @Get()
  getAll() {
    return this.wordbookService.getAll();
  }
  // 단어장 생성
  @Post("create")
  create(@Body() createWordbookDto: CreateWordbookDto) {
    return this.wordbookService.create(createWordbookDto);
  }
  // 단어장 개별 조회
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.wordbookService.get(id);
  }
  // 단어장 이름, 보안 수정
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateWordbookDto: UpdateWordbookDto,
  ) {
    return this.wordbookService.update(id, updateWordbookDto);
  }
  // 단어장 삭제
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.wordbookService.delete(id);
  }
}
