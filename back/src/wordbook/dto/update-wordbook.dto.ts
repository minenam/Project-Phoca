import { IsOptional, IsString } from "class-validator";

export class UpdateWordbookDto {
  @IsString()
  @IsOptional()
  wordbookName: string;

  @IsOptional()
  isPrivate: boolean;
}
