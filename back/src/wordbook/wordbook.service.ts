import { Injectable, NotFoundException } from "@nestjs/common";
import { Wordbook } from "./wordbook.entity";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { v4 as uuid } from "uuid";
@Injectable()
export class WordbookService {
  constructor(
    @InjectRepository(Wordbook)
    private wordbookRepository: Repository<Wordbook>,
  ) {}
  async getAll(): Promise<Wordbook[]> {
    return await this.wordbookRepository.find();
  }
  // async getById(userId): Promise<Wordbook[]> {
  //   return await this.wordbookRepository.find(userId);
  // }
  async create(wordbook: Partial<Wordbook>): Promise<Wordbook> {
    wordbook.wordbookId = uuid();
    const newWordbook = this.wordbookRepository.create(wordbook);
    return await this.wordbookRepository.save(newWordbook);
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
