import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
} from "class-validator";

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
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: "password only accpets english, number and !@#$%^&*.",
  })
  password: string;
}
