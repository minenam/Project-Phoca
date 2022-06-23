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
    const bookmark = await this.bookmarkRepository.find({
      where: {
        userId: createBookmarkDto.userId,
        wordbookId: createBookmarkDto.wordbookId,
      },
    });
    if (bookmark) {
      return "이미 북마크가 되어 있습니다.";
    }
    const newBookmark = this.bookmarkRepository.create(createBookmarkDto);
    return await this.bookmarkRepository.save(newBookmark);
  }

  async get(userId: string) {
    const userBookmarks = await this.bookmarkRepository.find({
      where: { userId },
    });
    if (!userBookmarks) {
      return new NotFoundException("북마크를 한 단어장이 존재하지 않습니다.");
    }
    return userBookmarks;
  }

  async getAll(wordbookId: string) {
    const wordBookmarks = await this.bookmarkRepository.find({
      where: { wordbookId },
    });
    if (!wordBookmarks) {
      throw new NotFoundException("해당 단어장을 북마크한 유저가 없습니다.");
    }
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
