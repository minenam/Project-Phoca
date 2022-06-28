import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Word } from "../word.entity";

export class CreateWordDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "영어 단어" })
  wordEng: Word["wordEng"];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "한글 단어" })
  wordKor: Word["wordKor"];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "이미지 키(이미지 삭제 시 필요)" })
  wordKey: Word["wordKey"];
}
