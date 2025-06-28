import { PublicImage } from './common'

export interface UserInput {
  username: string
  email: string
  password: string
  avatar?: PublicImage
}

export interface User extends Omit<UserInput, 'password'> {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface DeleteUserParams {
  userId: string
  password: string
}

export interface DeleteUserResponse {
  user: User
  message: string
}

export interface UpdateUserInput extends Partial<Omit<UserInput, 'password'>> {
  id: string
}

/* TODO: Quitar esta interfaz, reemplazarla por User,
  y comentar createdAt y updatedAt del type User
  para tener coherencia con lo que realmente
  se trabaja de un user
*/
export interface UserPayload {
  id: string
  username: string
  email: string
}

export type UserList = User[]
