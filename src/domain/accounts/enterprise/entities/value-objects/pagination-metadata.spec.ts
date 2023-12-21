import { PaginationMetadata } from './pagination-metadata'

describe('Pagination Metadata Value Object', () => {
  it('should be able to create a pagination metadata value object instance', () => {
    const paginationMetadata = PaginationMetadata.create({
      page: 1,
      limit: 10,
      total: 20,
    })

    expect(paginationMetadata.total).toBe(20)
    expect(paginationMetadata.currentPage).toBe(1)
    expect(paginationMetadata.lastPage).toBe(2)
    expect(paginationMetadata.previousPage).toBe(null)
    expect(paginationMetadata.nextPage).toBe(2)
  })
})
