import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Security } from "../wordbook.entity";

export class UpdateWordbookDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: "단어장 이름" })
  wordbookName: string;

  @IsOptional()
  @ApiProperty({ description: "단어장 공개 여부" })
  security: Security;
}
