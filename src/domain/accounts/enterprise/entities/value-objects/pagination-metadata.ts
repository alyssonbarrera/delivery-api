type PaginationMetadataProps = {
  total: number
  page: number
  limit: number
}

export class PaginationMetadata {
  total: number
  currentPage: number
  lastPage: number
  nextPage: number | null
  previousPage: number | null

  constructor({ total, page, limit }: PaginationMetadataProps) {
    this.total = total
    this.currentPage = page
    this.lastPage = Math.ceil(total / limit) || 1
    this.nextPage = page < this.lastPage ? page + 1 : null
    this.previousPage = page > 1 ? page - 1 : null
  }

  static create({ page, limit, total }: PaginationMetadataProps) {
    return new PaginationMetadata({ page, limit, total })
  }
}
