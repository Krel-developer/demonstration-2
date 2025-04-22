export interface IRequestServiceRes {
  status: number
  body: any
  error: string | null
}

export interface IRequestService {
  readonly serverUrl: string
  request(
    url: string,
    method: string,
    data: object | null
  ): Promise<IRequestServiceRes>
}

export type iQueryValue = string | number | boolean

export interface IQueryObject {
  [key: string]: iQueryValue | iQueryValue[]
}
export interface IHeader {
  [key: string]: string
}
