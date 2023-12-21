import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CreateAccountController } from './controllers/create-account.controller'
import { FetchAccountsController } from './controllers/fetch-accounts.controller'
import { CreateAccountUseCase } from '@/domain/accounts/application/use-cases/create-account'
import { FetchAccountsUseCase } from '@/domain/accounts/application/use-cases/fetch-accounts'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController, FetchAccountsController],
  providers: [CreateAccountUseCase, FetchAccountsUseCase],
})
export class HttpModule {}
