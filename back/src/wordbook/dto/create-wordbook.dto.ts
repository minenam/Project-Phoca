import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Security } from "../wordbook.entity";

export class CreateWordbookDto {
  @IsString()
  @IsNotEmpty()
  wordbookName: string;

  @IsOptional()
  security: Security;

  // createDate: Date;
}
