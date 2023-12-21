import { Account } from '@/domain/accounts/enterprise/entities/account'

export class AccountPresenter {
  static toHTTP(account: Account) {
    return {
      id: account.id.toString(),
      avatarKey: account.avatarKey,
      avatarUrl: account.avatarUrl,
      name: account.name,
      email: account.email,
      role: account.role,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    }
  }
}
