import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "../user/user.entity";
import { Wordbook } from "../wordbook/wordbook.entity";

@Entity("bookmark", { schema: "public" })
export class Bookmark {
  @Column("uuid", { primary: true, name: "bookmark_id" })
  @Generated("uuid")
  bookmarkId: string;

  @Column("uuid", { name: "user_id" })
  userId: string;

  @Column("uuid", { name: "wordbook_id" })
  wordbookId: string;

  @ManyToOne(() => Users, (user) => user.bookmark, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: Users;

  @ManyToOne(() => Wordbook, (wordbook) => wordbook.bookmark, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "wordbook_id" })
  wordbook: Wordbook;
}
