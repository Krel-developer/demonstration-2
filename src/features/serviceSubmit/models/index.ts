import { useDaysStore } from '@/entities/days'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'
import { useTimestore } from '@/entities/times'
import { useViewsStore } from '@/entities/views'

export function serviceSubmit(serviceId: number): void {
  const viewsStore = useViewsStore()

  const servicesStore = useServicesStore()
  const staffsStore = useStaffsStore()
  const daysStore = useDaysStore()
  const timesStore = useTimestore()

  // очищаем сторы свободных дат и времени
  daysStore.clearState()
  timesStore.clearState()

  // Складываем выбраную услугу в стор
  servicesStore.setCurrent(serviceId)

  // если услуги идут перед врачами, то очищаем state врачей и запрашиваем список врачей, а иначе запрашиваем список свободных дат

  if (!viewsStore.getIsStaffFirst) {
    staffsStore.clearState()
    staffsStore.staffsListFetch(serviceId)
  } else {
    daysStore.daysListFetch(serviceId, staffsStore.getCurrent)
  }
}
