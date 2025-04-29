export interface UserInput {
  username: string
  email: string
  password: string
}

export interface User extends Omit<UserInput, 'password'> {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface UserPayload {
  id: string
  username: string
  email: string
}
