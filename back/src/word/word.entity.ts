import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import { Wordbook } from "../wordbook/wordbook.entity";

//@Index("word_pkey", ["word_id"], { unique: true })
@Entity("word", { schema: "public" })
export class Word {
  @Column("uuid", { primary: true, name: "word_id" })
  @Generated("uuid")
  @ApiProperty({
    description: "단어 ID",
  })
  wordId: string;

  @Column("character varying", { name: "word_eng", length: 45, array: true })
  @ApiProperty({
    description: "영어 단어",
  })
  wordEng: string[];

  @Column("character varying", { name: "word_kor", length: 20, array: true })
  @ApiProperty({
    description: "한글 단어",
  })
  wordKor: string[];

  @Column("character varying", { name: "word_key" })
  @ApiProperty({
    description: "단어 키",
  })
  wordKey: string;

  @Column("uuid", { name: "wordbook_id", nullable: true })
  @ApiProperty({
    description: "단어장 ID",
  })
  wordbookId: string;

  @ManyToOne(() => Wordbook, (wordbook) => wordbook.words, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "wordbook_id" })
  wordbook: Wordbook;
}
