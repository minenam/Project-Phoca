import { Column, Entity, Generated, Index, OneToMany } from "typeorm";
import { Word } from "../word/word.entity";

export enum Security {
  PUBLIC = "public",
  PRIVATE = "private",
}
@Index("wordbook_pkey", ["wordbookId"], { unique: true })
@Entity("wordbook", { schema: "public" })
export class Wordbook {
  @Column("uuid", { primary: true, name: "wordbookid" })
  @Generated("uuid")
  wordbookId: string;

  @Column("character varying", { name: "wordbookname", length: 15 })
  wordbookName: string;

  @Column({ type: "enum", enum: Security, default: Security.PUBLIC })
  security: Security;

  @Column("timestamp without time zone", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @OneToMany(() => Word, (word) => word.wordbookId)
  wordId: Word[];
}
