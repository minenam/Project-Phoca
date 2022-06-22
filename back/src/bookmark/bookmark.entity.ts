import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "../user/user.entity";
import { Wordbook } from "../wordbook/wordbook.entity";

@Entity("bookmark", { schema: "public" })
export class Bookmark {
  @Column("uuid", { primary: true, name: "bookmark_id" })
  @Generated("uuid")
  @ApiProperty({
    description: "북마크 ID",
  })
  bookmarkId: string;

  @Column("uuid", { name: "user_id" })
  @ApiProperty({
    description: "유저 ID",
  })
  userId: string;

  @Column("uuid", { name: "wordbook_id" })
  @ApiProperty({
    description: "단어장 ID",
  })
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
