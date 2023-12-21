import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateAccountRequestDTO {
  @IsNotEmpty({
    message: 'Name is required',
  })
  @Length(5, 50)
  name: string

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail()
  email: string

  @IsNotEmpty({
    message: 'Password is required',
  })
  @Length(6)
  password: string
}
