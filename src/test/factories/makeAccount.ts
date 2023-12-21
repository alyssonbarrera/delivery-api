import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Account,
  AccountProps,
} from '@/domain/accounts/enterprise/entities/account'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAccountsMapper } from '@/infra/database/mappers/prisma-accounts-mapper'

export function makeAccount(
  override: Partial<AccountProps> = {},
  id?: UniqueEntityID,
) {
  const account = Account.create(
    {
      avatarKey: faker.string.uuid(),
      avatarUrl: faker.image.url(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return account
}

@Injectable()
export class AccountFactory {
  constructor(private prisma: PrismaService) {}

  async execute(data: Partial<AccountProps> = {}) {
    const account = makeAccount(data)

    await this.prisma.account.create({
      data: PrismaAccountsMapper.toPrisma(account),
    })

    return account
  }
}
