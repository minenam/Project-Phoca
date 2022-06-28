import { IsOptional, IsUUID } from "class-validator";
import { Word } from "../word.entity";

export class UpdateWordDto {
  @IsOptional()
  wordEng: Word["wordEng"];

  @IsOptional()
  wordKor: Word["wordKor"];

  @IsUUID()
  @IsOptional()
  wordbookId: Word["wordbookId"];
}
