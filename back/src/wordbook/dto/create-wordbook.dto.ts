import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateWordbookDto {
  @IsNotEmpty()
  @IsUUID()
  wordbookId: string;

  @IsString()
  @IsNotEmpty()
  wordbookName: string;

  @IsNotEmpty()
  isPrivate: boolean;

  @IsNotEmpty()
  createDate: Date;
}
