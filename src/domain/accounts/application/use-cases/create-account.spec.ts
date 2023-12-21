import { InMemoryAcccountsRepository } from '@/test/repositories/in-memory-account-repository'
import { CreateAccountUseCase } from './create-account'
import { makeAccount } from '@/test/factories/makeAccount'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAcccountsRepository: InMemoryAcccountsRepository
let sut: CreateAccountUseCase

describe('Create Account Use Case', () => {
  beforeEach(() => {
    inMemoryAcccountsRepository = new InMemoryAcccountsRepository()
    sut = new CreateAccountUseCase(inMemoryAcccountsRepository)
  })

  it('should be able to create a new account', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAcccountsRepository.items.length).toBe(1)
    expect(inMemoryAcccountsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'John Doe',
          email: expect.stringContaining('@'),
          password: expect.stringContaining('123456'),
        }),
      ]),
    )
  })

  it('should not be able to create a new account with an email that already exists', async () => {
    const newAccount = makeAccount(
      {
        email: 'johndoe@email.com',
      },
      new UniqueEntityID('account-id'),
    )

    await inMemoryAcccountsRepository.create(newAccount)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AccountAlreadyExistsError)
  })
})
