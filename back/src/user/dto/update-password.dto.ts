import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";
import { Users } from "../user.entity";

export class UpdatePasswordDto {
  @ApiProperty({
    description: "비밀번호",
    required: true,
    type: "string",
  })
  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: "비밀번호는 영어 대소문자, 숫자, !@#$%^&*. 만 가능합니다.",
  })
  currentPassword: Users["password"];

  @ApiProperty({
    description: "비밀번호",
    required: true,
    type: "string",
  })
  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: "비밀번호는 영어 대소문자, 숫자, !@#$%^&*. 만 가능합니다.",
  })
  newPassword: Users["password"];

  @ApiProperty({
    description: "비밀번호",
    required: true,
    type: "string",
  })
  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: "비밀번호는 영어 대소문자, 숫자, !@#$%^&*. 만 가능합니다.",
  })
  newPasswordValid: Users["password"];
}
