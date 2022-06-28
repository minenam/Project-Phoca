import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Users } from "../user.entity";

export class ParamUserDto {
  @ApiProperty({
    description: "유저 ID",
    name: "userId",
    required: true,
    type: "string",
    format: "uuid",
  })
  @IsString()
  userId: Users["userId"];
}
