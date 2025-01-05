export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}