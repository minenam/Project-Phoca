import { Column, Entity, Generated, Index, ManyToOne } from "typeorm";
import { Wordbook } from "../wordbook/wordbook.entity";

@Index("word_pkey", ["wordId"], { unique: true })
@Entity("word", { schema: "public" })
export class Word {
  @Column("uuid", { primary: true, name: "wordid" })
  @Generated("uuid")
  wordId: string;

  @Column("character varying", { name: "wordeng", length: 45 })
  wordEng: string;

  @Column("character varying", { name: "wordkor", length: 20 })
  wordKor: string;

  @Column("character varying", { name: "wordimage" })
  wordImage: string;

  @ManyToOne(() => Wordbook, (wordbookId) => wordbookId.wordId, {
    onDelete: "CASCADE",
    eager: true,
  })
  wordbookId: Wordbook;
}
