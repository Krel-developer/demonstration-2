import { useDaysStore } from '@/entities/days'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'
import { useTimestore } from '@/entities/times'
import { useViewsStore } from '@/entities/views'

export function staffSubmit(staffId: number): void {
  const viewsStore = useViewsStore()

  const servicesStore = useServicesStore()
  const staffsStore = useStaffsStore()
  const daysStore = useDaysStore()
  const timesStore = useTimestore()

  // очищаем сторы свободных дат и времени
  daysStore.clearState()
  timesStore.clearState()

  // Складываем выбраную услугу в стор
  staffsStore.setCurrent(staffId)

  // если врчи идут перед услугами, то очищаем state услуг и запрашиваем список услуг, а иначе запрашиваем список свободных дат

  if (viewsStore.getIsStaffFirst) {
    servicesStore.clearState()
    servicesStore.servicesListFetch(staffId)
  } else {
    daysStore.daysListFetch(servicesStore.getCurrent, staffId)
  }
}
