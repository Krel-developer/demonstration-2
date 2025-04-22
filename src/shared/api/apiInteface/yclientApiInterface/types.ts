export interface IYclientResponse<T> {
  success: boolean
  data: T
  meta: string[]
}
