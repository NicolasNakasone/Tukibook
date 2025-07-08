import { User } from './users'

// Ya no se usa
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

export interface ChangePasswordParams {
  password: string
  newPassword: string
}

export interface ChangePasswordResponse {
  message: string
}
