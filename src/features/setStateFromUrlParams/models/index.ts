import { useDaysStore } from '@/entities/days'
import { useServicesStore } from '@/entities/services'
import { useStaffsStore } from '@/entities/staffs'
import { useViewsStore } from '@/entities/views'
import { onMounted } from 'vue'

export function setStateFromUrlParams() {
  const servicesStore = useServicesStore()
  const staffsStore = useStaffsStore()
  const daysStore = useDaysStore()
  const viewsStore = useViewsStore()

  function scroolToActiveCard(): void {
    // Функция проверяет активные классы карточек Услуг или Врачей,
    // и прокруичвает до них скролбар(можно улучшить, отслеживая активный класс
    //  в компоненте карточки)

    const staffActiveCard = document.querySelector('.krel_staffs__item_active')
    if (staffActiveCard) {
      staffActiveCard.scrollIntoView(false)
    }
    const serviceActiveCard = document.querySelector(
      '.krel_services__item_active'
    )
    if (serviceActiveCard) {
      serviceActiveCard.scrollIntoView(false)
    }
  }

  onMounted(async () => {
    const url: URL = new URL(document.location.href)

    // Проверяем есть ли параметры в ссылке, если есть, то складываем в соответсвующие стейты

    const staffUrllParam: string | null = url?.searchParams?.get('staff_id')
    const serviceUrlParam: string | null = url?.searchParams?.get('service_id')

    // Если параметры существую начзначем current для сответсвующих сторов
    if (staffUrllParam) {
      staffsStore.setCurrent(+staffUrllParam)
    }
    if (serviceUrlParam) {
      servicesStore.setCurrent(+serviceUrlParam)
    }

    if (!serviceUrlParam && !staffUrllParam) {
      // Если  нет никаких параметров
      // То запрашиваем список всех услуг
      await servicesStore.servicesListFetch()
    }

    if (serviceUrlParam && !staffUrllParam) {
      // Если есть предвыбраная услуга, но нет предвыбраного врача
      // То запрашиваем список всех услуг, и врачей доступных для выбраной услуги
      await servicesStore.servicesListFetch()
      await staffsStore.staffsListFetch(+serviceUrlParam)
      // переключаем на второй шаг
      viewsStore.setStage(2)
    }
    if (!serviceUrlParam && staffUrllParam) {
      // Если есть предвыбраный врач, но нет предвыбраной услуги
      // То запрашиваем список всех врачей, и услуг доступных для выбраного врача
      // Ставим флаг врачи первые, для того что бы выбор врачей был на 1 шагу
      viewsStore.setStaffFirst()
      await servicesStore.servicesListFetch(+staffUrllParam)
      await staffsStore.staffsListFetch()
      // переключаем на второй шаг
      viewsStore.setStage(2)
    }
    if (serviceUrlParam && staffUrllParam) {
      // Если есть предвыбраная услуга и  предвыбранный врач
      // То запрашиваем список всех услуг, и врачей доступных для выбраной услуги

      await servicesStore.servicesListFetch(+staffUrllParam)
      await staffsStore.staffsListFetch()

      // далее запрашиваем списко ссвободных дат для выбранного врача
      await daysStore.daysListFetch(+serviceUrlParam, +staffUrllParam)

      // переключаем на третий шаг
      viewsStore.setStage(3)
    }

    scroolToActiveCard()
  })
}
