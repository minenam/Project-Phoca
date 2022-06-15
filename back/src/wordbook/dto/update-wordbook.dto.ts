import { IsOptional, IsString } from "class-validator";
import { Security } from "../wordbook.entity";

export class UpdateWordbookDto {
  @IsString()
  @IsOptional()
  wordbookName: string;

  @IsOptional()
  security: Security;
}
