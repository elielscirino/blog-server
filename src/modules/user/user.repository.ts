import Repository from '../../abstracts/repository'
import { ReadOptions } from '../../types/globals'
import AppError from '../../utils/appError'
import { CreateUserDTO, User } from './user.interfaces'

export default class UserRepository extends Repository {
  async create(data: CreateUserDTO) {
    try {
      const { columns, placeholders, values } = this.formatData(data)
      
      const query = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING id;`
      const { rows } = await this.pool.query<{id: string}>(query, values)

      return rows[0].id
    } catch (error) {
      console.error('Erro ao cadastrar usuário', error)
      AppError.internal('Erro ao cadastrar usuário')
    }
  }

  async read(opt: ReadOptions<User>) {
    try {
      const { columns, conditions, values } = this.formatRead(opt)

      const query = `SELECT ${columns} FROM users WHERE ${conditions};`
      const { rows } = await this.pool.query<User>(query, values)

      return rows
    } catch (error) {
      console.error('Erro ao ler usuário', error)
      AppError.internal('Erro ao ler usuário')
    }
  }
}