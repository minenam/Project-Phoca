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
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
@ApiTags("단어장 API")
@Controller("wordbook")
export class WordbookController {
  constructor(private wordbookService: WordbookService) {}
  //전체 단어장 조회
  @Get()
  getAll() {
    return this.wordbookService.getAll();
  }
  // 단어장 생성
  @Post("create/:userId")
  @ApiParam({
    name: "userId",
    type: "string",
    description: "유저 아이디",
    required: true,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        wordbookName: {
          type: "string",
          description: "단어장 이름",
        },
        security: {
          type: "string",
          description: "단어장 공개 여부",
          example: "private or public",
        },
      },
    },
  })
  create(
    @Param("userId") userId: string,
    @Body() createWordbookDto: CreateWordbookDto,
  ) {
    return this.wordbookService.create({ userId, ...createWordbookDto });
  }
  // 유저의 단어장 조희
  @Get("user/:userId")
  @ApiParam({
    name: "userId",
    type: "string",
    description: "유저 아이디",
    required: true,
  })
  findById(@Param("userId") userId: string) {
    return this.wordbookService.getById(userId);
  }
  // 단어장 개별 조회
  @Get(":wordbookId")
  @ApiParam({
    name: "wordbookId",
    type: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  findOne(@Param("wordbookId") wordbookId: string) {
    return this.wordbookService.get(wordbookId);
  }
  // 단어장 이름, 보안 수정
  @Patch(":wordbookId")
  @ApiParam({
    name: "wordbookId",
    type: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        wordbookName: {
          type: "string",
          description: "단어장 이름",
        },
        security: {
          type: "string",
          description: "단어장 공개 여부",
          example: "private or public",
        },
      },
    },
  })
  update(
    @Param("wordbookId") wordbookId: string,
    @Body() updateWordbookDto: UpdateWordbookDto,
  ) {
    return this.wordbookService.update(wordbookId, updateWordbookDto);
  }
  // 단어장 삭제
  @Delete(":wordbookId")
  @ApiParam({
    name: "wordbookId",
    type: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  delete(@Param("wordbookId") wordbookId: string) {
    return this.wordbookService.delete(wordbookId);
  }
}
