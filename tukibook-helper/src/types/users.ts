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

export interface DeleteUserParams {
  userId: string
  password: string
}

export interface DeleteUserResponse {
  user: User
  message: string
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
