import { useDaysStore } from '@/entities/days'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'
import { useTimestore } from '@/entities/times'

export function daySubmit(day: string): void {
  const servicesStore = useServicesStore()
  const staffsStore = useStaffsStore()
  const daysStore = useDaysStore()
  const timesStore = useTimestore()

  // очищаем стор свободного времени
  timesStore.clearState()

  daysStore.setCurrent(day)

  timesStore.timesListFetch(
    servicesStore.getCurrent,
    staffsStore.getCurrent,
    day
  )
}
