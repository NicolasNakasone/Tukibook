export interface ResponseError {
  message: string
}

export interface ApiResponse<T> {
  data?: T
  error?: ResponseError
}

export interface GetPage {
  page: number
}
