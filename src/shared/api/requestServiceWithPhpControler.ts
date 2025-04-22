import type {
  IRequestService,
  IRequestServiceRes,
  IHeader,
} from '../utils/krelServerApi/types'

export class RequestServiceWithPhpControler implements IRequestService {
  constructor(readonly serverUrl: string) {}
  async request(
    url: string,
    method: string,
    data: object | null
  ): Promise<IRequestServiceRes> {
    const headers: IHeader = {}

    headers['Accept'] = 'application/vnd.api.v2+json'

    const body = JSON.stringify({
      data,
      method,
      url: `${this.serverUrl}/${url}`,
    })
    let response

    const dataResponse: IRequestServiceRes = {
      status: NaN,
      body: null,
      error: null,
    }

    try {
      response = await fetch(
        // `/wp-content/themes/onkoplus/boocking-api/boocking_app_new.php`,
        `http://onkoplus/wp-content/themes/onkoplus/boocking-api/boocking_app_new.php`,
        {
          method: 'POST',
          headers,
          body,
        }
      )
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
