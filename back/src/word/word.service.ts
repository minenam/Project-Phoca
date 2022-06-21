import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { Word } from "./word.entity";

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
  ) {}
  //단어 생성
  async create(word: CreateWordDto) {
    console.log("1", word);
    const newWord = this.wordRepository.create(word);
    return await this.wordRepository.save(newWord);
  }

  async get(wordId: string) {
    const word = await this.wordRepository.findOne({
      where: { wordId },
    });
    return word;
  }

  async getAll(wordbookId: string) {
    const wordbook = await this.wordRepository.find({
      where: { wordbookId },
    });
    return wordbook;
  }

  async update(wordId: string, updateWordDto: UpdateWordDto) {
    const word = await this.wordRepository.findOne({ where: { wordId } });
    if (!word) {
      throw new NotFoundException("word not found");
    }
    Object.assign(word, updateWordDto);
    return this.wordRepository.save(word);
  }

  async deleteWord(wordId: string): Promise<string> {
    const word = await this.wordRepository.findOne({ where: { wordId } });
    if (!word) {
      throw new NotFoundException("word not found");
    }
    await this.wordRepository.remove(word);
    const key = word.wordKey;
    return key;
  }
}
