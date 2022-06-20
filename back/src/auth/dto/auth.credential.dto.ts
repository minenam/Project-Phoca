import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
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
