import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Query,
} from "@nestjs/common";
import { WordbookService } from "./wordbook.service";
import { UpdateWordbookDto } from "./dto/update-wordbook.dto";
import { CreateWordbookDto } from "./dto/create-wordbook.dto";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/auth.guard";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth("accesskey")
@ApiTags("단어장 API")
@Controller("wordbook")
export class WordbookController {
  constructor(private wordbookService: WordbookService) {}

  //전체 단어장 조회
  @Get()
  @ApiOperation({
    summary: "전체 단어장 조회 API",
    description: "단어장 공개 여부를 public으로 설정한 모든 단어장을 조회.",
  })
  getAll() {
    return this.wordbookService.getAll();
  }
  // 단어장 생성
  @Post("create/:userId")
  @ApiOperation({
    summary: "단어장 생성 API",
    description:
      "유저의 아이디와 단어장 정보를 입력 받아 유저 소유의 단어장을 생성.",
  })
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
        secured: {
          type: "boolean",
          description: "단어장 공개 여부",
          example: "true or false",
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

  //키워드로 단어장 검색
  @Get("/search/")
  @ApiOperation({
    summary: "단어장 검색 API",
    description: "키워드를 입력받아 단어장을 검색.",
  })
  @ApiQuery({
    name: "keyword",
    type: "string",
    description: "검색어",
    required: true,
  })
  search(@Query("keyword") keyword: string) {
    return this.wordbookService.search(keyword);
  }

  // 내 단어장 개수 카운트
  @Get("/count/:userId")
  @ApiOperation({
    summary: "단어장 개수 카운트 API",
    description: "유저 아이디를 입력받아 단어장 개수 카운트.",
  })
  @ApiParam({
    name: "userId",
    type: "string",
    format: "uuid",
    description: "유저 아이디",
    required: true,
  })
  countWordbook(@Param("userId") userId: string) {
    return this.wordbookService.countWordbook(userId);
  }

  //본인 단어장 제외하고 조회
  @Get("/:userId")
  @ApiOperation({
    summary: "본인 제외 전체 단어장 조회 API",
    description:
      "본인 단어장 제외하고 단어장 공개 여부를 public으로 설정한 모든 단어장을 조회.",
  })
  @ApiParam({
    name: "userId",
    type: "string",
    description: "유저 아이디",
    required: true,
  })
  getExcept(@Param("userId") userId: string) {
    return this.wordbookService.getExcept(userId);
  }
  // 유저의 단어장 조희
  @Get("user/:userId")
  @ApiOperation({
    summary: "유저 단어장 조회 API",
    description: "유저의 아이디를 입력 받아 유저 소유의 단어장 전체 조회.",
  })
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
  @Get("/single/:wordbookId")
  @ApiOperation({
    summary: "단어장 개별 조회 API",
    description: "단어장 아이디를 입력받아 단어장을 조회.",
  })
  @ApiParam({
    name: "wordbookId",
    type: "string",
    format: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  findOne(@Param("wordbookId") wordbookId: string) {
    return this.wordbookService.get(wordbookId);
  }

  // 단어장 이름, 보안 수정
  @Patch(":wordbookId")
  @ApiOperation({
    summary: "단어장 수정 API",
    description:
      "단어장 아이디와 수정할 내용을 입력받아 단어장 내용을 수정한다.",
  })
  @ApiParam({
    name: "wordbookId",
    type: "string",
    format: "uuid",
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
        secured: {
          type: "boolean",
          description: "단어장 공개 여부",
          example: "true or false",
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
  @ApiOperation({
    summary: "단어장 삭제 API",
    description: "단어장 아이디를 입력받아 단어장을 삭제.",
  })
  @ApiParam({
    name: "wordbookId",
    type: "string",
    format: "uuid",
    description: "단어장 아이디",
    required: true,
  })
  async delete(@Param("wordbookId") wordbookId: string) {
    return await this.wordbookService.delete(wordbookId);
  }
}
