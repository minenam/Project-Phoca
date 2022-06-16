import { IsOptional } from "class-validator";

export class UpdateWordDto {
  @IsOptional()
  wordEng: string;

  @IsOptional()
  wordKor: string;
}
