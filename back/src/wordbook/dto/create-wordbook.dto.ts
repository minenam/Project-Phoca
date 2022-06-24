import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Wordbook } from "../wordbook.entity";

export class CreateWordbookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "단어장 이름" })
  wordbookName: Wordbook["wordbookName"];

  @IsOptional()
  @ApiProperty({ description: "단어장 공개 여부" })
  secured: Wordbook["secured"];
}
