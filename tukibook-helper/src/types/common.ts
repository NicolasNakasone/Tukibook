export interface ResponseError {
  message: string
}

type ApiSuccess<T> = { data: T; error?: undefined }
type ApiFailure = { error: ResponseError; data?: undefined }

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export interface GetPage {
  page: number
}

export enum SortType {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export interface PublicImage {
  url: string
  publicId: string
}
