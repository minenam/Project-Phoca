import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WordCreatedEvent } from "../events/word-created.event";
import { CreateWordDto } from "./dto/create-word.dto";
import { UpdateWordDto } from "./dto/update-word.dto";
import { Word } from "./word.entity";
@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
    private readonly eventEmitter: EventEmitter2,
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

  async countWord(wordbookId: string): Promise<number> {
    return await this.wordRepository.count({
      where: { wordbookId },
    });
  }

  async getRandomWord(wordbookId: string) {
    const words = await this.wordRepository.find({ where: { wordbookId } });
    const wordPair = [];
    const wordArray = [];
    const chosenIndex = [];
    const wordSet = [];
    while (wordSet.length != 8) {
      const random = Number((Math.random() * (words.length - 1)).toFixed());
      if (!chosenIndex.includes(random)) {
        wordSet.push(words[random]);
        chosenIndex.push(random);
      }
    }
    for (const word of wordSet) {
      const wordObj = new Object();
      const wordName = word.wordEng[0];
      const { wordKey } = word;
      wordObj[wordName] = wordKey;
      wordPair.push(wordObj);
    }
    for (const word of wordSet) {
      wordArray.push(...word.wordEng);
      wordArray.push(word.wordKey);
    }
    return [wordPair, wordArray];
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
}
