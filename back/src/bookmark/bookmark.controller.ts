import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
@ApiTags("북마크 API")
@Controller("bookmark")
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get("/:userId")
  @ApiParam({
    name: "userId",
    type: "uuid",
    description: "유저 아이디",
    required: true,
  })
  get(@Param("userId") userId: string) {
    return this.bookmarkService.get(userId);
  }

  @Post("/")
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
