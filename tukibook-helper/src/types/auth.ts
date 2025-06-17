import { User } from './users'

export interface RegisterParams {
  username: string
  email: string
  password: string
}

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface LogoutResponse {
  message: string
}
