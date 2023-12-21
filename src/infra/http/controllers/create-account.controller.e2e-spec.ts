import request from 'supertest'
import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
// import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AccountFactory } from '@/test/factories/makeAccount'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create Account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  // let accountFactory: AccountFactory

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AccountFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    // accountFactory = moduleRef.get(AccountFactory)

    await app.init()
  })

  it('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const accountOnDatabase = await prisma.account.findUnique({
      where: {
        email: response.body.account.email,
      },
    })

    expect(accountOnDatabase).toBeTruthy()

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        account: {
          id: expect.any(String),
          avatarKey: null,
          avatarUrl: null,
          name: 'John Doe',
          email: 'johndoe@email.com',
          role: 'USER',
          createdAt: expect.any(String),
          updatedAt: null,
        },
      }),
    )
  })
})
