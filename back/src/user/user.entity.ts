import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bookmark } from "../bookmark/bookmark.entity";
import { Wordbook } from "../wordbook/wordbook.entity";

@Index("users_pkey", ["userid"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  @Column("uuid", { primary: true, name: "user_id" })
  userid: string;

  @Column("character varying", { name: "username" })
  username: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("character varying", { name: "provider", default: "local" })
  provider: string;

  @Column("timestamp", { name: "joined_at", default: new Date() })
  joinedAt: Date;

  @Column("timestamp", { name: "last_logined_at", default: new Date() })
  lastloginedAt: Date;

  @Column("boolean", { name: "activated", default: true })
  activated: boolean;

  @OneToMany(() => Wordbook, (wordbook) => wordbook.user)
  wordbook: Wordbook[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmark: Bookmark[];
}
