import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

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
  @Matches(/^([a-z0-9]+)@([a-z0-9]+).(\.[A-Za-z]{2,3})$/, {
    message: "email(ID) only accepts english and number",
  })
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
