import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  userName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @Matches(/^([a-z0-9]+)@([a-z0-9]+).(\.[A-Za-z]{2,3})$/, {
    message: "email(ID) only accepts english and number",
  })
  email: string;

  @IsString()
  @MinLength(4)
  @Matches(/^[a-zA-Z0-9!@#$%^&*]*$/, {
    message: "password only accpets english, number and !@#$%^&*.",
  })
  password: string;
}
