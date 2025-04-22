import { defineStore } from 'pinia'

import { apiInterface } from '@/shared/api'
import type { IStaff } from '@/shared/types'

interface Store {
  list: IStaff[]
  current: number | null
  loading: boolean
}

const defaultValue: Store = {
  list: [],
  current: null,
  loading: false,
}

export const useStaffsStore = defineStore('staffsEntitie', {
  state: () => {
    return { ...defaultValue }
  },
  actions: {
    async staffsListFetch(serviceId?: number | null) {
      this.loading = true

      const staffs = await apiInterface.getStaffs(serviceId)

      this.setList(staffs)

      this.loading = false
    },

    setList(newList: IStaff[]): void {
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
    getCurrentfStaffName: (state) => {
      let name = 'Вы не выбрали врача'

      state.list.forEach((el) => {
        if (el.id === state.current) {
          name = el.name
        }
      })
      return name
    },
  },
})
