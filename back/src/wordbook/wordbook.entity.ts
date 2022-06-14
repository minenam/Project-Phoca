import { Column, Entity, Index } from "typeorm";
// import { Word } from '../word/word.entity';
@Index("wordbook_pkey", ["wordbookId"], { unique: true })
@Entity("wordbook", { schema: "public" })
export class Wordbook {
  @Column("uuid", { primary: true, name: "wordbookid" })
  wordbookId: string;

  @Column("character varying", { name: "wordbookname", length: 15 })
  wordbookName: string;

  @Column("boolean", { name: "isprivate", default: () => "false" })
  isPrivate: boolean;

  @Column("timestamp without time zone", {
    name: "createDate",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  // @OneToMany(() => Word, (word) => word.wordbookId)
  // word: Word[];
}
