import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWordbookDto {
  // @IsUUID()
  // wordbookId: string;

  @IsString()
  @IsNotEmpty()
  wordbookName: string;

  @IsOptional()
  isPrivate: boolean;

  // createDate: Date;
}
