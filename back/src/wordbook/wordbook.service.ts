import { Injectable } from "@nestjs/common";
import { Wordbook } from "./wordbook.entity";
import { Repository, DeleteResult } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWordbookDto } from "./dto/create-wordbook.dto";
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
  async create(createWordbookDto: CreateWordbookDto): Promise<Wordbook> {
    createWordbookDto.wordbookId = uuid();
    createWordbookDto.createDate = new Date(Date.now());
    console.log(createWordbookDto);
    const newWordbook = await this.wordbookRepository.create(createWordbookDto);
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
    await this.wordbookRepository.update(wordbookId, wordbook);
    return await this.wordbookRepository.findOne({ where: { wordbookId } });
  }
  async delete(wordbookId: string): Promise<DeleteResult> {
    await this.wordbookRepository.findOne({ where: { wordbookId } });
    return await this.wordbookRepository.delete(wordbookId);
  }
}
