import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { AccountPresenter } from '../presenters/account-presenter'
import { FetchAccountsUseCase } from '@/domain/accounts/application/use-cases/fetch-accounts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 20

@Controller('accounts')
export class FetchAccountsController {
  constructor(private readonly fetchAccountsUseCase: FetchAccountsUseCase) {}

  @Get()
  async handle(@Query() query: { page: string; limit: string }) {
    const result = await this.fetchAccountsUseCase.execute({
      page: Number(query.page) || DEFAULT_PAGE,
      limit: Number(query.limit) || DEFAULT_LIMIT,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const accounts = result.value.accounts

    return {
      accounts: accounts.map(AccountPresenter.toHTTP),
      metadata: result.value.metadata,
    }
  }
}
