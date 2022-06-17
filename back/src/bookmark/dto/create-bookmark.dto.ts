import { IsNotEmpty, IsString } from "class-validator";

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  wordbookId: string;
}
