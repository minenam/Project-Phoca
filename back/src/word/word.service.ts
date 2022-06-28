import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WordCreatedEvent } from "../events/word-created.event";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { ImageService } from "./image.service";
import { Word } from "./word.entity";
@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
    private readonly eventEmitter: EventEmitter2,
    private imageService: ImageService,
  ) {}
  //단어 생성
  async create(word: CreateWordDto) {
    const newWord = this.wordRepository.create(word);
    const savedWord = await this.wordRepository.save(newWord);
    const { wordId } = savedWord;
    this.eventEmitter.emit("word.created", new WordCreatedEvent(wordId));
    return savedWord;
  }

  async get(wordId: string) {
    const word = await this.wordRepository.findOne({
      where: { wordId },
    });
    if (!word) {
      return new NotFoundException("단어가 존재하지 않습니다.");
    }
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

    await this.wordRepository.save(word);
    return await this.wordRepository.findOne({ where: { wordId } });
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

  @OnEvent("word.created", { async: true })
  async checkEscape(payload: WordCreatedEvent) {
    const { wordId } = payload;
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3600000));
    const word = await this.wordRepository.findOne({ where: { wordId } });
    const { wordbookId, wordKey } = word;
    if (!wordbookId) {
      await this.imageService.deleteImage(wordKey);
      await this.deleteWord(wordId);

      console.log("unsaved word deleted");
    }
  }
}
