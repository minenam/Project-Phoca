import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateWordDto {
  @IsOptional()
  @ApiProperty({ description: "영어 단어" })
  wordEng: string[];

  @IsOptional()
  @ApiProperty({ description: "한글 단어" })
  wordKor: string[];
}
