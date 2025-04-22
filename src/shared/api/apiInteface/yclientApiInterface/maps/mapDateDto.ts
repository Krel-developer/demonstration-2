import type { IDate } from '@/shared/types'

export function mapDateDto(dateDto: string): IDate {
  // Приводим вид 'гггг-мм-дд' к 'День недели дд.мм.гггг'

  const date: Date = new Date(dateDto)
  const formatDate = `${daysOfWeek[date.getDay()]} ${date.toLocaleDateString()}`

  return {
    day: dateDto,
    formatedDay: formatDate,

    //Даты у нас всегда заведомо разные, поэтому id получается уникальным
    id: +date,
  }
}

const daysOfWeek = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
]
