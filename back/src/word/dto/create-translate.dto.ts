import { IsString } from "class-validator";

export class TranslateDto {
  @IsString()
  readonly text: string;

  @IsString()
  readonly to: string = "ko";

  @IsString()
  readonly from?: string = "en";
}
