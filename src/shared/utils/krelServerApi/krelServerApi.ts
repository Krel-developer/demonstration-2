import { objToQuery } from './objToQuery'
import type { IQueryObject, IRequestService } from './types'

export class krelServerApi {
  constructor(readonly requestService: IRequestService) {}
  async post(url: string, data: object) {
    return await this.requestService.request(url, 'POST', data)
  }
  async get(url: string, queryParamObj: IQueryObject | null = null) {
    // проверяем сущестует ли объект квери параметров, если да, то приводим его к строке и добавляем к ссылке
    if (queryParamObj) {
      const queryParam = objToQuery(queryParamObj)

      url += queryParam
    }
    return await this.requestService.request(url, 'GET', null)
  }
}
