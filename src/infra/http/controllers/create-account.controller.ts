import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common'

import { AccountPresenter } from '../presenters/account-presenter'

import { CreateAccountRequestDTO } from '@/domain/accounts/application/dtos/create-account-request-dto'
import { CreateAccountUseCase } from '@/domain/accounts/application/use-cases/create-account'
import { AccountAlreadyExistsError } from '@/domain/accounts/application/use-cases/errors/account-already-exists-error'

@Controller('accounts')
export class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAccountRequestDTO) {
    const { name, email, password } = body

    const result = await this.createAccountUseCase.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AccountAlreadyExistsError:
          throw new HttpException(error.message, 409)
        default:
          throw new HttpException('Internal server error', 500)
      }
    }

    const account = result.value.account

    return { account: AccountPresenter.toHTTP(account) }
  }
}
