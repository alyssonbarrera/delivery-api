import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaAccountsMapper } from '../../mappers/prisma-accounts-mapper'
import { Account } from '@/domain/accounts/enterprise/entities/account'
import { AccountsRepository } from '@/domain/accounts/application/repositories/accounts-repository-dto'

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {
  constructor(private prisma: PrismaService) {}

  async create({ name, email, password }: Account) {
    const account = await this.prisma.account.create({
      data: {
        name,
        email,
        password,
      },
    })

    return PrismaAccountsMapper.toDomain(account)
  }

  async findByEmail(email: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountsMapper.toDomain(account)
  }

  async findById(id: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        id,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountsMapper.toDomain(account)
  }

  async fetchAll({ page, limit }: { page: number; limit: number }) {
    const accounts = await this.prisma.account.findMany({
      take: limit,
      skip: (page - 1) * limit,
    })

    return accounts.map(PrismaAccountsMapper.toDomain)
  }

  async count() {
    return this.prisma.account.count()
  }
}
