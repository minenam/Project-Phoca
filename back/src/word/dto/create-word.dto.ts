import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateWordDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "영어 단어" })
  wordEng: string[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: "한글 단어" })
  wordKor: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "이미지 키(이미지 삭제 시 필요)" })
  wordKey: string;
}
