import { NextFunction, Response } from 'express'
import { AppRequest } from '../../types/globals'
import { CreateUserDTO } from './user.interfaces'
import databasePool from '../../database/postgresql.pool'
import UserRepository from './user.repository'
import UserServices from './user.services'

class UserController {
  async register(
    req: AppRequest<null, CreateUserDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req

      const pool = databasePool
      const userRepository = new UserRepository(pool)
      
      const userServices = new UserServices(userRepository)
      await userServices.register(body)

      res.status(201).send({ message: 'Cadastro realizado com sucesso', code: 201 })
    } catch (error) {
      next(error)
    }
  }

  async login(
    req: AppRequest<null, CreateUserDTO>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { body } = req

      const pool = databasePool
      const userRepository = new UserRepository(pool)
      
      const userServices = new UserServices(userRepository)
      const response = await userServices.login(body.email, body.password)

      res.status(200).send(response)
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()