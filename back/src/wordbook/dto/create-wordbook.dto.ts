import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateWordbookDto {
  @IsNotEmpty()
  @IsUUID()
  wordbookId: string;

  @IsNotEmpty()
  wordbookName: string;

  @IsNotEmpty()
  isPrivate: boolean;

  @IsNotEmpty()
  createDate: Date;
}
