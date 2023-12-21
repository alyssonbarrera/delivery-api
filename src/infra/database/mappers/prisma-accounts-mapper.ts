import { Account as PrismaAccount } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/accounts/enterprise/entities/account'

export class PrismaAccountsMapper {
  static toDomain(raw: PrismaAccount): Account {
    return Account.create(
      {
        avatarKey: raw.avatarKey,
        avatarUrl: raw.avatarUrl,
        name: raw.name,
        email: raw.email,
        role: raw.role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(account: Account): PrismaAccount {
    return {
      id: account.id.toString(),
      avatarKey: account.avatarKey ?? null,
      avatarUrl: account.avatarUrl ?? null,
      name: account.name,
      email: account.email,
      role: account.role,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      password: account.password,
    }
  }
}
