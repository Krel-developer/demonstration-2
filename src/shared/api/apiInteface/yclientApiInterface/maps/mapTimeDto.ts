import type { ITime } from '@/shared/types'
import type { ITimeDto } from '../dto/timeDto'

export function mapTimeDto(timeDto: ITimeDto): ITime {
  const date = new Date(timeDto.datetime)

  return {
    time: timeDto.time,
    datetime: timeDto.datetime,

    //Время на конкретные даты всегда заведомо разные, поэтому id получается уникальным
    id: +date,
  }
}
