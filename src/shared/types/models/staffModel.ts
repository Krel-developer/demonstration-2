import type { IEntitie } from '../types'

export interface IStaff extends IEntitie {
  name: string
  specialization: string
  avatarSrc: string
}
