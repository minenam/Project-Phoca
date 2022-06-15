import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
