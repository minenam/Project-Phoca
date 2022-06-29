import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WordCreatedEvent } from "../../events/word-created.event";
import { ImageService } from "../image.service";
import { Word } from "../word.entity";
import { WordService } from "../word.service";

@Injectable()
export class WordCreatedListener {
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
    private imageService: ImageService,
    private wordService: WordService,
  ) {}
  @OnEvent("word.created", { async: true })
  async checkEscape(payload: WordCreatedEvent) {
    console.log("word created");
    const { wordId } = payload;
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3600000));
    const word = await this.wordRepository.findOne({ where: { wordId } });
    const { wordbookId, wordKey } = word;
    if (!wordbookId) {
      await this.imageService.deleteImage(wordKey);
      await this.wordService.deleteWord(wordId);
      console.log("unsaved word deleted");
    }
  }
}
