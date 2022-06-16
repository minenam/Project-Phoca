import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TranslateService } from "../word/translate.service";
import { TranslateDto } from "../word/dto/translate.dto";

@Controller("translate")
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async translate(@Body() translateDto: TranslateDto): Promise<string> {
    return this.translateService.translate(
      translateDto.text,
      translateDto.to,
      translateDto.from,
    );
  }
}
