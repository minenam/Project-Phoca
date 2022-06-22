import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Bookmark } from "../bookmark/bookmark.entity";
import { Wordbook } from "../wordbook/wordbook.entity";

@Index("users_pkey", ["userId"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn("uuid")
  @ApiProperty({
    description: "유저 ID",
  })
  @Column("uuid", { primary: true, name: "user_id" })
  userId: string;

  @ApiProperty({
    description: "유저 이름",
  })
  @Column("character varying", { name: "username" })
  userName: string;

  @Unique(["email"])
  @ApiProperty({
    description: "이메일(아이디)",
  })
  @Column("character varying", { name: "email" })
  email: string;

  @ApiProperty({
    description: "비밀번호",
  })
  @Column("character varying", { name: "password" })
  password: string;

  @ApiProperty({
    description: "가입경로",
  })
  @Column("character varying", { name: "provider", default: "local" })
  provider: string;

  @ApiProperty({
    description: "가입일",
  })
  @Column("timestamp", { name: "joined_at", default: new Date() })
  joinedAt: Date;

  @ApiProperty({
    description: "마지막로그인일",
  })
  @Column("timestamp", { name: "last_logined_at", default: new Date() })
  lastloginedAt: Date;

  @ApiProperty({
    description: "활동여부",
  })
  @Column("boolean", { name: "activated", default: true })
  activated: boolean;

  @OneToMany(() => Wordbook, (wordbook) => wordbook.user)
  wordbook: Wordbook[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
  bookmark: Bookmark[];
}
