import { useViewsStore } from '@/entities/views'
import type { ISubmitData } from '../types'
// import { apiInterface } from '@/shared/api'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'
import { useTimestore } from '@/entities/times'
import { message } from '@/shared/utils'

export async function finishRecord(data: ISubmitData) {
  const viewsStore = useViewsStore()
  const servicesStore = useServicesStore()
  const staffsStore = useStaffsStore()
  const timesStore = useTimestore()

  if (
    servicesStore.getCurrent &&
    staffsStore.getCurrent &&
    timesStore.getCurrent
  ) {
    const recordData = {
      serviceId: servicesStore.getCurrent,
      staffId: staffsStore.getCurrent,
      finaleDate: timesStore.getCurrent,
      phone: data.phone,
      fulname: data.fullname,
      code: data.code,
    }

    // Это конечная точка приложения, пока что для демонстрации без запроса на сервер
    // const record = await apiInterface.bookRecord(recordData)

    // if (record.success) {
    //   message.success('Ваша запись успешно оформлена')
    //   viewsStore.setRecordCompleted()
    // }
    console.log('отправление данных', recordData)

    message.success('Ваша запись успешно оформлена')
    viewsStore.setRecordCompleted()
  }
}
