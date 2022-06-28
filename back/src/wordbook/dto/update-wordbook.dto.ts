import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateWordbookDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: "단어장 이름" })
  wordbookName: string;

  @IsOptional()
  @ApiProperty({ description: "단어장 공개 여부" })
  secured: boolean;
}
