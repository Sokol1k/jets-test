export interface IUpdateForMiddeware {
  name?: string | boolean,
  surname?: string | boolean,
  email?: string | boolean
}

export interface IUpdateForService {
  readonly name: string,
  readonly surname: string,
  readonly email: string,
  readonly currentEmail: string
}

export interface IChangePasswordForMiddeware {
  oldPassword?: string | boolean,
  newPassword?: string | boolean
}

export interface IChangePasswordForService {
  readonly oldPassword: string,
  readonly newPassword: string
}