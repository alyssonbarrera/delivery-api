import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AccountsRepository } from '@/domain/accounts/application/repositories/accounts-repository-dto'
import { PrismaAccountsRepository } from './prisma/repositories/prisma-accounts.repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AccountsRepository,
      useClass: PrismaAccountsRepository,
    },
  ],
  exports: [PrismaService, AccountsRepository],
})
export class DatabaseModule {}
