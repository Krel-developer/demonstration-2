import type { IDate } from './models/dateModel'
import type { IRecordStatus } from './models/recordStatusModel'
import type { IService } from './models/serviceModel'
import type { IStaff } from './models/staffModel'
import type { ITime } from './models/timeModel'

export interface IEntitie {
  id: number

  [key: string]: any
}

interface IRecordData {
  serviceId: number
  staffId: number
  finaleDate: string
  phone: string
  fulname: string
  code: number
}

export interface IApiInterface {
  getServices(staffsId?: number | null): Promise<IService[]>
  getStaffs(serviceId?: number | null): Promise<IStaff[]>
  getDays(serviceId: number, staffId: number): Promise<IDate[]>
  getTimes(serviceId: number, staffId: number, date: string): Promise<ITime[]>
  getBookCode(phone: string, fulname: string): Promise<boolean>
  bookRecord(data: IRecordData): Promise<IRecordStatus>
}
