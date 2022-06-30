import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";
@Entity("quiz_word", { schema: "public" })
export class Quiz {
  @Column("int4", { primary: true, name: "id" })
  @ApiProperty({
    description: "퀴즈 단어 번호",
  })
  id: number;

  @Column("character varying", {
    name: "word_eng",
    length: 45,
  })
  @ApiProperty({
    description: "영어 단어",
  })
  wordEng: string;

  @Column("character varying", { name: "word_kor", length: 20 })
  @ApiProperty({
    description: "한글 단어",
  })
  wordKor: string;
}
