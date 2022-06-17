import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Bookmark } from "../bookmark/bookmark.entity";
import { Users } from "../user/user.entity";
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

  @Column("uuid", { name: "user_id" })
  userId: string;

  @OneToMany(() => Word, (word) => word.wordbook)
  words: Word[];

  @ManyToOne(() => Users, (user) => user.wordbook, {
    onDelete: "CASCADE",
    //eager: true,
  })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.wordbook)
  bookmark: Bookmark[];
}
