import { Injectable, NotFoundException } from "@nestjs/common";
import { Security, Wordbook } from "./wordbook.entity";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class WordbookService {
  constructor(
    @InjectRepository(Wordbook)
    private wordbookRepository: Repository<Wordbook>,
  ) {}
  async getAll(): Promise<Wordbook[]> {
    return await this.wordbookRepository.find({
      where: { security: Security.PUBLIC },
    });
  }
  // async getById(userId): Promise<Wordbook[]> {
  //   return await this.wordbookRepository.find(userId);
  // }
  async create(wordbook: Partial<Wordbook>): Promise<Wordbook> {
    try {
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
  async delete(wordbookId: string): Promise<DeleteResult> {
    await this.wordbookRepository.findOne({ where: { wordbookId } });
    return await this.wordbookRepository.delete(wordbookId);
  }
}
