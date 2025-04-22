import { defineStore } from 'pinia'

import { apiInterface } from '@/shared/api'
import type { ITime } from '@/shared/types'

interface Store {
  list: ITime[]
  current: string | null
  loading: boolean
}

const defaultValue: Store = {
  list: [],
  current: null,
  loading: false,
}

export const useTimestore = defineStore('timesEntitie', {
  state: () => {
    return { ...defaultValue }
  },
  actions: {
    async timesListFetch(
      serviceId: number | null,
      staffId: number | null,
      date: string | null
    ) {
      this.loading = true

      let times: ITime[] = []
      if (serviceId && staffId && date) {
        times = await apiInterface.getTimes(serviceId, staffId, date)
      }

      this.setList(times)

      this.loading = false
    },

    setList(newList: ITime[]): void {
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
    getFormatedCurrentTime: (state) => {
      let formatedTime = 'Вы не выбрали время'
      state.list.forEach((el) => {
        if (el.datetime === state.current) {
          formatedTime = el.time
        }
      })

      return formatedTime
    },
  },
})
