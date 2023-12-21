import { Injectable } from '@nestjs/common'
import { left, right, Either } from '@/core/either'

import { Account } from '../../enterprise/entities/account'
import { AccountsRepository } from '../repositories/accounts-repository-dto'
import { CreateAccountRequestDTO } from '../dtos/create-account-request-dto'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'

type CreateAccountResponse = Either<
  AccountAlreadyExistsError,
  { account: Account }
>

@Injectable()
export class CreateAccountUseCase {
  constructor(private repository: AccountsRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountRequestDTO): Promise<CreateAccountResponse> {
    const accountAlreadyExists = await this.repository.findByEmail(email)

    if (accountAlreadyExists) {
      return left(new AccountAlreadyExistsError())
    }

    const account = Account.create({
      name,
      email,
      password,
    })

    await this.repository.create(account)

    return right({ account })
  }
}
