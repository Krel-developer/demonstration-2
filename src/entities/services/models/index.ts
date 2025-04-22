import { defineStore } from 'pinia'

import type { IService } from '@/shared/types'
import { apiInterface } from '@/shared/api'

interface Store {
  list: IService[]
  current: number | null
  loading: boolean
}

const defaultValue: Store = {
  list: [],
  current: null,
  loading: false,
}

export const useServicesStore = defineStore('servicesEntitie', {
  state: () => {
    return { ...defaultValue }
  },
  actions: {
    async servicesListFetch(staffId?: number | null) {
      this.loading = true

      const services = await apiInterface.getServices(staffId)

      this.setList(services)

      this.loading = false
    },

    setList(newList: IService[]): void {
      this.list = newList
    },
    setCurrent(newCurrent: number) {
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
    getCurrentServiceName: (state) => {
      let name = 'Вы не выбрали услугу'

      state.list.forEach((el) => {
        if (el.id === state.current) {
          name = el.title
        }
      })
      return name
    },
  },
})
