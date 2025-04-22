import { defineStore } from 'pinia'

export const useViewsStore = defineStore('viewsEntitie', {
  state: () => ({
    stage: 1,
    isStaffFirst: false,
    isRecordCompleted: false,
  }),
  actions: {
    setStage(newStage: number): void {
      this.stage = newStage
    },
    setStaffFirst() {
      this.isStaffFirst = true
    },
    setRecordCompleted() {
      this.isRecordCompleted = true
    },
  },
  getters: {
    stageNum: (state) => state.stage,
    getIsStaffFirst: (state) => state.isStaffFirst,
    getIsRecordCompleted: (state) => state.isRecordCompleted,
  },
})
