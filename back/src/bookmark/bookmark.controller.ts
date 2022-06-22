import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/auth.guard";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth("accesskey")
@ApiTags("북마크 API")
@Controller("bookmark")
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get("/:userId")
  @ApiOperation({
    summary: "유저의 북마크 조회 API",
    description: "유저 아이디를 입력받아 유저가 북마크한 단어장 조회.",
  })
  @ApiParam({
    name: "userId",
    type: "string",
    format: "uuid",
    description: "유저 아이디",
    required: true,
  })
  get(@Param("userId") userId: string) {
    return this.bookmarkService.get(userId);
  }

  @Post("/")
  @ApiOperation({
    summary: "북마크 생성 API",
    description:
      "북마크를 누른 유저의 아이디와 북마크한 단어장의 아이디를 입력 받아 북마크를 생성.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "유저 아이디",
        },
        wordbookId: {
          type: "string",
          description: "단어장 아이디",
        },
      },
    },
  })
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    console.log(createBookmarkDto);
    return this.bookmarkService.create(createBookmarkDto);
  }
  @Delete("/")
  @ApiOperation({
    summary: "북마크 삭제 API",
    description:
      "북마크를 누른 유저의 아이디와 북마크한 단어장의 아이디를 입력 받아 북마크를 삭제.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        userId: {
          type: "string",
          description: "유저 아이디",
        },
        wordbookId: {
          type: "string",
          description: "단어장 아이디",
        },
      },
    },
  })
  delete(@Body() createBookmarkDto: CreateBookmarkDto) {
    const { userId, wordbookId } = createBookmarkDto;
    return this.bookmarkService.delete(userId, wordbookId);
  }
}
