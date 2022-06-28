import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { Bookmark } from "../bookmark.entity";

export class CreateBookmarkDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: "유저 아이디" })
  userId: Bookmark["userId"];

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ description: "단어장 아이디" })
  wordbookId: Bookmark["wordbookId"];
}
