import { Response } from 'express'

export class ErrorHandler extends Error {
  public statusCode : number
  public body : any
  constructor(statusCode : number, body : any) {
    super()
    this.statusCode = statusCode
    this.body = body
  }
}

export const handleError = (err : ErrorHandler, res : Response) => {
  const { statusCode, body } = err;
  res.status(statusCode).json(body);
};