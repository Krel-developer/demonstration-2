import { useTimestore } from '@/entities/times'

export function timeSubmit(time: string): void {
  const timesStore = useTimestore()

  timesStore.setCurrent(time)
}
