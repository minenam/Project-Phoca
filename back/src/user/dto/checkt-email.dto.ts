import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class CheckEmailDto {
  @ApiProperty({
    description: "이메일",
    name: "userId",
    required: true,
    type: "string",
  })
  @IsEmail()
  email: string;
}
