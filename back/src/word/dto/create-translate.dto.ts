import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TranslateDto {
  @IsString()
  @ApiProperty({ description: "번역할 단어" })
  readonly text: string;

  @IsString()
  @ApiProperty({ description: "어떤 언어로 번역할지" })
  readonly to: string = "ko";

  @IsString()
  @ApiProperty({ description: "어떤 언어를 번역할지" })
  readonly from?: string = "en";
}
