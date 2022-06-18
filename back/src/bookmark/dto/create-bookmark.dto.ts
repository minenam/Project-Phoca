import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateBookmarkDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: "유저 아이디" })
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: "단어장 아이디" })
  wordbookId: string;
}
