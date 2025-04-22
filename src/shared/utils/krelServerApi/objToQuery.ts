import type { IQueryObject, iQueryValue } from './types'

// На входе получаем объект вида:
// {
//   param1: value1,
//   param2: value2,
//   param3: [value3, value4]
//   ...
// }

// получаем строку '?param1=value1&param2=value2&param3=value4&param3=value4'

export function objToQuery(obj: IQueryObject): string {
  let param: string = ''
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (Array.isArray(value)) {
      value.forEach((el: iQueryValue) => {
        param = addToParam(param, key + '=' + el)
      })
    } else {
      param = addToParam(param, key + '=' + value)
    }
  })
  return param
}

function addToParam(param: string, value: string) {
  if (param) {
    return param + '&' + value
  } else {
    return '?' + value
  }
}
