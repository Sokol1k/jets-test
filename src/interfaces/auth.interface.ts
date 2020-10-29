export interface IAuthValidator {
  name?: string | boolean,
  surname?: string | boolean,
  email?: string | boolean,
  password?: string | boolean,
  resetLink?: string | boolean,
  newPassword?: string | boolean
}

export interface IRegister {
  readonly name: string,
  readonly surname: string,
  readonly email: string,
  password: string,
  readonly confirmPassword: string
}

export interface ILogin {
  readonly email: string,
  readonly password: string,
}

export interface IForget {
  readonly email: string,
}

export interface IReset {
  readonly resetLink: string,
  readonly newPassword: string,
  readonly confirmNewPassword: string
}