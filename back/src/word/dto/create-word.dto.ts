import { IsNotEmpty, IsString } from "class-validator";

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  wordEng: string;

  @IsString()
  @IsNotEmpty()
  wordKor: string;

  @IsString()
  @IsNotEmpty()
  wordImage: string;

  @IsString()
  @IsNotEmpty()
  wordKey: string;

  @IsString()
  @IsNotEmpty()
  wordbookId: string;
}
