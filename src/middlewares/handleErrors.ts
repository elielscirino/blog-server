import { NextFunction, Request, Response } from 'express'
import AppError from '../utils/appError'

class HandleErrors {
  async handleErrors(
    error: AppError,
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error('Error:', error.message, 'Code:', error.statusCode)
    res.status(error.statusCode).send({
      message: error.statusCode === 500 ? 'Erro interno no servidor.' : error.message,
      code: error.statusCode
     })
    next()
  }
}

export default new HandleErrors().handleErrors
