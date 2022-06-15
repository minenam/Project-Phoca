import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Security } from "../wordbook.entity";

export class CreateWordbookDto {
  // @IsUUID()
  // wordbookId: string;

  @IsString()
  @IsNotEmpty()
  wordbookName: string;

  @IsOptional()
  security: Security;

  // createDate: Date;
}
