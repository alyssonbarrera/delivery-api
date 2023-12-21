import { Account } from '../../enterprise/entities/account'

type FetchAllAccountsParams = {
  page: number
  limit: number
}

export abstract class AccountsRepository {
  abstract create: (data: Account) => Promise<Account>
  abstract findByEmail: (email: string) => Promise<Account | null>
  abstract findById: (id: string) => Promise<Account | null>
  abstract fetchAll: ({
    page,
    limit,
  }: FetchAllAccountsParams) => Promise<Account[]>

  abstract count: () => Promise<number>
}
