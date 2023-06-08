import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WordCreatedEvent } from "../../events/word-created.event";
import { ImageMiddleware } from "../../middleware/image.middleware";
import { Word } from "../word.entity";
import { WordService } from "../word.service";

@Injectable()
export class WordCreatedListener {
  private readonly logger = new Logger("WordCreatedListener");
  constructor(
    @InjectRepository(Word)
    private wordRepository: Repository<Word>,
    private imageMiddleware: ImageMiddleware,
    private wordService: WordService,
  ) {}
  @OnEvent("word.created", { async: true })
  async checkEscape(payload: WordCreatedEvent) {
    this.logger.verbose("word created");
    const { wordId } = payload;
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3600000));
    const word = await this.wordRepository.findOne({ where: { wordId } });
    const { wordbookId, wordKey } = word;
    if (!wordbookId) {
      await this.imageMiddleware.deleteImage(wordKey);
      await this.wordService.deleteWord(wordId);
      this.logger.verbose("unsaved word deleted");
    }
  }
}
