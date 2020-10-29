import validator from 'validator'

class Validator {
  private message : string | boolean = false
  private value : string

  constructor(value : string) {
    this.value = value
    return this
  }

  public min(amount : number) : Validator {
    if (!validator.isLength(this.value, { min: amount, max: undefined })) {
      this.message = `Field must be longer than ${amount} symbols`
    }
    return this
  }

  public max(amount : number) : Validator {
    if (!validator.isLength(this.value, { min: undefined, max: amount })) {
      this.message =  `Field must be shorter than ${amount} symbols`
    }
    return this
  }

  public required() : Validator {
    if (!this.value) {
      this.message =  `Field must be required`
    }
    return this
  }

  public email() : Validator {
    if (!validator.isEmail(this.value)) {
      this.message = "Email is incorrect"
    }
    return this
  }

  public confirmPassword(confirmPassword: string) : Validator {
    if (this.value !== confirmPassword) {
      this.message = 'Password does not match';
    }
    return this
  }

  public showMessage() : string | boolean {
    return this.message
  }
}

export default Validator