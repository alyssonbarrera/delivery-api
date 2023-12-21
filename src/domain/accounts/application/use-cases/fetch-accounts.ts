import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/either'
import { Account } from '@/domain/accounts/enterprise/entities/account'
import { AccountsRepository } from '../repositories/accounts-repository-dto'
import { PaginationMetadata } from '../../enterprise/entities/value-objects/pagination-metadata'

interface FetchAccountsRequestDTO {
  page: number
  limit: number
}

type FetchAccountsResponse = Either<
  null,
  { accounts: Account[]; metadata: PaginationMetadata }
>

@Injectable()
export class FetchAccountsUseCase {
  constructor(private repository: AccountsRepository) {}

  async execute({
    page,
    limit,
  }: FetchAccountsRequestDTO): Promise<FetchAccountsResponse> {
    const accounts = await this.repository.fetchAll({
      page,
      limit,
    })

    const totalAccounts = await this.repository.count()

    const metadata = PaginationMetadata.create({
      total: totalAccounts,
      page,
      limit,
    })

    return right({ accounts, metadata })
  }
}
