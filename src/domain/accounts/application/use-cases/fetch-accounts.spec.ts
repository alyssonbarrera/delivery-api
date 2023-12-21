import { InMemoryAcccountsRepository } from '@/test/repositories/in-memory-account-repository'
import { FetchAccountsUseCase } from './fetch-accounts'
import { makeAccount } from '@/test/factories/makeAccount'
import { Account } from '../../enterprise/entities/account'

let inMemoryAcccountsRepository: InMemoryAcccountsRepository
let sut: FetchAccountsUseCase

const makeMultipleAccounts = async ({ total = 20 } = {}) => {
  let index = 0
  const newAccounts: Account[] = []

  while (index < total) {
    const newAccount = makeAccount()
    await inMemoryAcccountsRepository.create(newAccount)
    newAccounts.push(newAccount)
    index++
  }

  return newAccounts
}

describe('Fetch Accounts Use Case', () => {
  beforeEach(() => {
    inMemoryAcccountsRepository = new InMemoryAcccountsRepository()
    sut = new FetchAccountsUseCase(inMemoryAcccountsRepository)
  })

  it('should be able to fetch all accounts', async () => {
    const newAccounts = await makeMultipleAccounts({ total: 20 })

    const result = await sut.execute({
      page: 1,
      limit: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.accounts.length).toBe(10)
    expect(result.value?.accounts).toEqual(
      expect.arrayContaining([newAccounts[0]]),
    )
    expect(result.value?.accounts).not.toEqual(
      expect.arrayContaining([newAccounts[10]]),
    )

    expect(result.value?.metadata).toEqual(
      expect.objectContaining({
        total: 20,
        currentPage: 1,
        lastPage: 2,
        nextPage: 2,
        previousPage: null,
      }),
    )
  })

  it('should be able to fetch all accounts in the second page', async () => {
    const newAccounts = await makeMultipleAccounts({ total: 20 })

    const result = await sut.execute({
      page: 2,
      limit: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.accounts.length).toBe(10)
    expect(result.value?.accounts).toEqual(
      expect.arrayContaining([newAccounts[10]]),
    )
    expect(result.value?.accounts).not.toEqual(
      expect.arrayContaining([newAccounts[0]]),
    )

    expect(result.value?.metadata).toEqual(
      expect.objectContaining({
        total: 20,
        currentPage: 2,
        lastPage: 2,
        nextPage: null,
        previousPage: 1,
      }),
    )
  })
})
