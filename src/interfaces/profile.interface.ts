export interface IUpdateForMiddeware {
  name?: string | boolean,
  surname?: string | boolean,
  email?: string | boolean
}

export interface IUpdateForService {
  readonly name: string,
  readonly surname: string,
  readonly email: string,
}

export interface IChangePassword {
  oldPassword?: string | boolean,
  newPassword?: string | boolean
}