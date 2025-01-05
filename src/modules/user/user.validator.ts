import { NextFunction, Response } from 'express'
import { AppRequest } from '../../types/globals'
import { CreateUserDTO } from './user.interfaces'
import { z as zod, ZodError } from 'zod'
import AppError from '../../utils/appError'

enum ErrorMessages {
  NOT_FOUND_FIRST_NAME = 'Nome é obrigatório',
  INVALID_TYPE_FIRST_NAME = 'Nome deve ser uma string',
  INVALID_RANGE_FIRST_NAME = 'Nome deve ter entre 3 e 100 caracteres',
  NOT_FOUND_LAST_NAME = 'Sobrenome é obrigatório',
  INVALID_TYPE_LAST_NAME = 'Sobrenome deve ser uma string',
  INVALID_RANGE_LAST_NAME = 'Sobrenome deve ter entre 3 e 100 caracteres',
  INVALID_EMAIL = 'Email inválido',
}

class CreateUserValidator {
  async validate(
    req: AppRequest<null, CreateUserDTO>,
    _res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req

      const UserSchema = zod.object({
        firstName: zod
        .string({ 
          required_error: ErrorMessages.NOT_FOUND_FIRST_NAME,
          invalid_type_error: ErrorMessages.INVALID_TYPE_FIRST_NAME
        })
        .min(3, ErrorMessages.INVALID_RANGE_FIRST_NAME)
        .max(100, ErrorMessages.INVALID_RANGE_FIRST_NAME),
        lastName: zod
        .string({
          required_error: ErrorMessages.NOT_FOUND_LAST_NAME,
          invalid_type_error: ErrorMessages.INVALID_TYPE_LAST_NAME
        })
        .min(3, ErrorMessages.INVALID_RANGE_LAST_NAME)
        .max(100, ErrorMessages.INVALID_RANGE_LAST_NAME),
        email: zod
        .string({
          message: ErrorMessages.INVALID_EMAIL,
        })
        .email(ErrorMessages.INVALID_EMAIL),
        password: zod.string(),
      })

      try {
        UserSchema.parse(body)
        next()
      } catch (error: unknown) {
        if (error instanceof ZodError) {
          AppError.badRequest(error.errors[0].message)
        }
      }
    } catch (error) {
      next(error)
    }
  }
}

export default new CreateUserValidator()

