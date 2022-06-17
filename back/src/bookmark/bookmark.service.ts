import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bookmark } from "./bookmark.entity";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private bookmarkRepository: Repository<Bookmark>,
  ) {}
  //단어 생성
  async create(createBookmarkDto: CreateBookmarkDto) {
    const newBookmark = this.bookmarkRepository.create(createBookmarkDto);
    return await this.bookmarkRepository.save(newBookmark);
  }

  async get(userId: string) {
    const userBookmarks = await this.bookmarkRepository.find({
      where: { userId },
    });
    return userBookmarks;
  }

  async getAll(wordbookId: string) {
    const wordBookmarks = await this.bookmarkRepository.find({
      where: { wordbookId },
    });
    return wordBookmarks;
  }
  async delete(userId: string, wordbookId: string): Promise<string> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { userId, wordbookId },
    });
    if (!bookmark) {
      throw new NotFoundException("북마크 찾을 수 없음");
    }
    await this.bookmarkRepository.remove(bookmark);
    return `북마크가 삭제되었습니다.`;
  }
}
