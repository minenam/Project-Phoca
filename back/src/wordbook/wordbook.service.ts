import { Injectable, NotFoundException } from "@nestjs/common";
import { Wordbook } from "./wordbook.entity";
import { Repository, Not, Like } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class WordbookService {
  constructor(
    @InjectRepository(Wordbook)
    private wordbookRepository: Repository<Wordbook>,
  ) {}
  async getAll(): Promise<Wordbook[]> {
    return await this.wordbookRepository.find({
      where: { secured: false },
      order: {
        createDate: "DESC",
      },
    });
  }

  async getExcept(userId: string): Promise<Wordbook[]> {
    return await this.wordbookRepository.find({
      where: { secured: false, userId: Not(userId) },
    });
  }

  async getById(userId: string): Promise<Wordbook[]> {
    return await this.wordbookRepository.find({
      where: { userId },
      order: {
        createDate: "DESC",
      },
    });
  }

  async search(keyword: string): Promise<Wordbook[]> {
    return await this.wordbookRepository.find({
      where: { wordbookName: Like(`${keyword}%`) },
    });
  }

  async countWordbook(userId: string): Promise<number> {
    return await this.wordbookRepository.count({
      where: { userId },
    });
  }

  async create(wordbook: Partial<Wordbook>): Promise<Wordbook> {
    try {
      console.log(wordbook);
      const newWordbook = this.wordbookRepository.create(wordbook);
      return await this.wordbookRepository.save(newWordbook);
    } catch (e) {
      return e.driverError.where;
    }
  }

  async get(wordbookId: string): Promise<Wordbook> {
    return await this.wordbookRepository.findOne({
      where: { wordbookId },
    });
  }

  async update(
    wordbookId: string,
    wordbook: Partial<Wordbook>,
  ): Promise<Wordbook> {
    const item = await this.wordbookRepository.findOne({
      where: { wordbookId },
    });
    if (!item) {
      throw new NotFoundException("wordbook not found");
    }
    Object.assign(item, wordbook);
    return this.wordbookRepository.save(item);
  }

  async delete(wordbookId: string): Promise<string> {
    const wordbook = await this.wordbookRepository.findOne({
      where: { wordbookId },
    });
    if (!wordbook) {
      throw new NotFoundException("해당 단어장이 존재하지 않습니다.");
    }
    await this.wordbookRepository.remove(wordbook);
    return "단어장이 삭제되었습니다.";
  }
}
