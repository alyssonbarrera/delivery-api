import { Entity } from '@/core/entities/entities'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AccountRole } from '@/core/enums/account-role-enum'
import { Optional } from '@/core/types/optional'

export type AccountProps = {
  id?: UniqueEntityID
  avatarKey: string | null
  avatarUrl: string | null
  name: string
  email: string
  role: AccountRole
  createdAt: Date
  updatedAt: Date | null
  password: string
}

type AccountPropsOptional = Optional<
  AccountProps,
  'id' | 'createdAt' | 'updatedAt' | 'avatarKey' | 'avatarUrl' | 'role'
>

export class Account extends Entity<AccountProps> {
  get avatarKey() {
    return this.props.avatarKey
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get role() {
    return this.props.role
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get password() {
    return this.props.password
  }

  public static create(props: AccountPropsOptional, id?: UniqueEntityID) {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
        avatarKey: props.avatarKey ?? null,
        avatarUrl: props.avatarUrl ?? null,
        role: props.role ?? 'USER',
      },
      id,
    )

    return account
  }
}
