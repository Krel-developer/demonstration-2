import { krelServerApi } from '../utils/krelServerApi/krelServerApi'

// запрос напрямую к API yclient (этот режим для разработки и отладки)
import { DefaultRequestService } from '../utils/krelServerApi/default/defaultRequestService'
import { TOKEN } from '../constants'
const requestService = new DefaultRequestService(
  `https://api.yclients.com/api/v1`,
  TOKEN
)

// Запрос через php прослойку, токен не передается напрямую, а подставляется в php (сделано что бы скрыть токен в запросах)
// import { RequestServiceWithPhpControler } from './requestServiceWithPhpControler'
// const requestService = new RequestServiceWithPhpControler(
//   `https://api.yclients.com/api/v1`
// )

export const apiInstance = new krelServerApi(requestService)
