import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "유저 이름",
    required: true,
    type: "string",
  })
  @IsString()
  @MinLength(2)
  @MaxLength(15)
  userName: string;

  @ApiProperty({
    description: "이메일(아이디)",
    required: true,
    type: "string",
  })
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "비밀번호",
    required: true,
    type: "string",
  })
  @IsString()
  @MinLength(4)
  @IsEmail()
  password: string;
}
