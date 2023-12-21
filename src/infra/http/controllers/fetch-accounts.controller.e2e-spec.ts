import request from 'supertest'

import { AppModule } from '@/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { AccountFactory } from '@/test/factories/makeAccount'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Fetch Accounts (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let accountFactory: AccountFactory

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    accountFactory = moduleRef.get(AccountFactory)

    await app.init()
  })

  beforeEach(async () => {
    await prisma.account.deleteMany()
  })

  it('[GET] /accounts', async () => {
    const response = await request(app.getHttpServer()).get('/accounts')

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        accounts: expect.any(Array),
        metadata: expect.objectContaining({
          total: 0,
          currentPage: 1,
          nextPage: null,
          lastPage: 1,
          previousPage: null,
        }),
      }),
    )

    expect(response.body.accounts.length).toBe(0)
  })

  it('[GET] /accounts?page=1&limit=10', async () => {
    let index = 0
    while (index < 20) {
      await accountFactory.execute()
      index++
    }

    const response = await request(app.getHttpServer())
      .get('/accounts?page=1&limit=10')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        accounts: expect.any(Array),
        metadata: expect.objectContaining({
          total: 20,
          currentPage: 1,
          lastPage: 2,
          nextPage: 2,
          previousPage: null,
        }),
      }),
    )

    expect(response.body.accounts.length).toBe(10)
  })
})
