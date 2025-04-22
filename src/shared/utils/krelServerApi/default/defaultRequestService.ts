import type { IRequestService, IRequestServiceRes, IHeader } from '../types'

interface IDefaultRequestService extends IRequestService {
  readonly token: string
}

export class DefaultRequestService implements IDefaultRequestService {
  constructor(readonly serverUrl: string, readonly token: string) {}
  async request(
    url: string,
    method = 'GET',
    data: object | null = null
  ): Promise<IRequestServiceRes> {
    let body

    const headers: IHeader = {}

    headers['Accept'] = 'application/vnd.api.v2+json'
    headers['Authorization'] = `Bearer ${this.token}`

    if (data) {
      headers['Content-Type'] = 'application/json'

      body = JSON.stringify(data)
    }

    let response

    const dataResponse: IRequestServiceRes = {
      status: NaN,
      body: null,
      error: null,
    }

    try {
      response = await fetch(`${this.serverUrl}/${url}`, {
        method,
        headers,
        body,
      })
    } catch (e: unknown) {
      if (e instanceof Error) {
        dataResponse.error = e.message
      }
    }

    if (response) {
      dataResponse.status = response.status
      dataResponse.body = await response.json()
    }

    return dataResponse
  }
}
