import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Wordbook } from "../wordbook/wordbook.entity";

@Index("word_pkey", ["wordId"], { unique: true })
@Entity("word", { schema: "public" })
export class Word {
  @Column("uuid", { primary: true, name: "wordid" })
  wordId: string;

  @Column("character varying", { name: "wordeng", length: 45 })
  wordEng: string;

  @Column("character varying", { name: "wordkor", length: 20 })
  wordKor: string;

  @ManyToOne(() => Wordbook, (wordbook) => wordbook.wordId, {
    onDelete: "CASCADE",
  })
  wordbookId: Wordbook;
}
