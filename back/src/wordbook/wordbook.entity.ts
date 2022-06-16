import { Column, Entity, Generated, OneToMany } from "typeorm";
import { Word } from "../word/word.entity";

export enum Security {
  PUBLIC = "public",
  PRIVATE = "private",
}
//@Index("wordbook_pkey", ["wordbook_id"], { unique: true })
@Entity("wordbook", { schema: "public" })
export class Wordbook {
  @Column("uuid", { primary: true, name: "wordbook_id" })
  @Generated("uuid")
  wordbookId: string;

  @Column("character varying", { name: "wordbook_name", length: 15 })
  wordbookName: string;

  @Column({ type: "enum", enum: Security, default: Security.PUBLIC })
  security: Security;

  @Column("timestamp without time zone", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @OneToMany(() => Word, (word) => word.wordbook)
  words: Word[];
}
