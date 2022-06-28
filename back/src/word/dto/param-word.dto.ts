import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";
import { Word } from "../word.entity";

export class ParamWordDto {
  @ApiProperty({
    name: "wordbookId",
    description: "단어장 아이디",
    type: "string",
    format: "uuid",
    required: true,
    example: "c8f47a48-4278-4a04-acb3-8b382f0c2029",
  })
  @IsUUID()
  @IsOptional()
  wordbookId: Word["wordbookId"];
}
