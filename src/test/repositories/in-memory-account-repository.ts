import { AccountsRepository } from '@/domain/accounts/application/repositories/accounts-repository-dto'
import { Account } from '@/domain/accounts/enterprise/entities/account'

export class InMemoryAcccountsRepository implements AccountsRepository {
  public items: Account[] = []

  async create(data: Account) {
    this.items.push(data)

    return data
  }

  async findByEmail(email: string) {
    return this.items.find((account) => account.email === email) || null
  }

  async findById(id: string) {
    return this.items.find((account) => account.id.toString() === id) || null
  }

  async fetchAll({ page, limit }: { page: number; limit: number }) {
    const offset = (page - 1) * limit
    const accounts = this.items.slice(offset, offset + limit)

    return accounts
  }

  async count() {
    return this.items.length
  }
}
