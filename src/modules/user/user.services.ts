import AppError from '../../utils/appError'
import { CreateUserDTO } from './user.interfaces'
import UserRepository from './user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default class UserServices {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async register(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, 10)
    await this.userRepository.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role
    })
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.read({
      columns: ['id', 'firstName', 'lastName', 'role', 'password'],
      where: [['email = $1', email]]
    })

    if (!user) {
      return AppError.unauthorized('')
    }
  
    const [userData] = user

    const isPasswordValid = await bcrypt.compare(password, userData.password)
    if (!isPasswordValid) {
      return AppError.unauthorized('')
    }

    const payload = {
      id: userData.id,
      role: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName
    }

    if (!process.env.JWT_SECRET) {
      return AppError.internal('JWT_SECRET não definido')
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

    return {
      token,
      user: payload
    }
  }
}