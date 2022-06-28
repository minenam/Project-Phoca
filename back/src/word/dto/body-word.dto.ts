import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { Word } from "../word.entity";

export class BodyWordDto {
  @ApiProperty({
    name: "wordEng",
    type: Word["wordEng"],
    description: "영어 단어",
    example: ["word"],
  })
  @IsOptional()
  wordEng: Word["wordEng"];

  @ApiProperty({
    name: "wordKor",
    type: Word["wordKor"],
    description: "한글 단어",
    example: ["단어"],
  })
  @IsOptional()
  wordKor: Word["wordKor"];

  @ApiProperty({
    name: "wordbookId",
    type: Word["wordbookId"],
    description: "단어장 아이디",
    example: "c8f47a48-4278-4a04-acb3-8b382f0c2029",
  })
  @IsUUID()
  @IsOptional()
  wordbookId: Word["wordbookId"];
}
