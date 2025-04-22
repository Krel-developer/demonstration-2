import { defineStore } from 'pinia'

import { apiInterface } from '@/shared/api'
import type { IDate } from '@/shared/types'

interface Store {
  list: IDate[]
  current: string | null
  loading: boolean
}

const defaultValue: Store = {
  list: [],
  current: null,
  loading: false,
}

export const useDaysStore = defineStore('daysEntitie', {
  state: () => {
    return { ...defaultValue }
  },
  actions: {
    async daysListFetch(serviceId: number | null, staffId: number | null) {
      this.loading = true

      let days: IDate[] = []
      if (serviceId && staffId) {
        days = await apiInterface.getDays(serviceId, staffId)
      }

      this.setList(days)

      this.loading = false
    },

    setList(newList: IDate[]): void {
      this.list = newList
    },
    setCurrent(newCurrent: string) {
      this.current = newCurrent
    },
    clearState() {
      this.$patch(defaultValue)
    },
  },
  getters: {
    getList: (state) => state.list,
    getCurrent: (state) => state.current,
    getLoading: (state) => state.loading,
    getFormatedCurrentDay: (state) => {
      let formatedDay = 'Вы не выбрали день'
      state.list.forEach((el) => {
        if (el.day === state.current) {
          formatedDay = el.formatedDay
        }
      })

      return formatedDay
    },
  },
})
