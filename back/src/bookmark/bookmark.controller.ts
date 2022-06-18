import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";

@Controller("bookmark")
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get("/:userId")
  get(@Param("userId") userId: string) {
    return this.bookmarkService.get(userId);
  }

  @Post("/")
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    console.log(createBookmarkDto);
    return this.bookmarkService.create(createBookmarkDto);
  }
  @Delete("/")
  delete(@Body() createBookmarkDto: CreateBookmarkDto) {
    const { userId, wordbookId } = createBookmarkDto;
    return this.bookmarkService.delete(userId, wordbookId);
  }
}
