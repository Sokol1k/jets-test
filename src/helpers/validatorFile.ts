class ValidatorFile {
  private message : string | boolean = false
  private file : any

  constructor(file: any) {
    this.file = file
    return this
  }

  public size(size: number) : ValidatorFile {
    if (this.file.size > (size * 1024 * 1024)) {
      this.message = `The file size exceeds ${size} MB`
    }
    return this
  }

  public fileType(types : Array<string>) : ValidatorFile {
    if (!types.includes(this.file.mimetype)) {
      this.message = `The file must be of the following types: ${types.join(', ')}`
    }
    return this
  }

  public showMessage() : string | boolean {
    return this.message
  }
}

export default ValidatorFile