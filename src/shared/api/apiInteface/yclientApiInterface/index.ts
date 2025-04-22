import type { IApiInterface, IDate, IRecordStatus, ITime } from '@/shared/types'
import type { IQueryObject } from '@/shared/utils/krelServerApi/types'
import { apiInstance } from '../../base'
import type { IDateData } from './dto/dateDto'
import type { IServicesData } from './dto/seviceDto'
import type { IStaffDto } from './dto/staffDto'
import { mapDateDto } from './maps/mapDateDto'
import { mapServiceDto } from './maps/mapServiceDto'
import { mapStaffDto } from './maps/mapStaffDto'
import type { IYclientResponse } from './types'
import type { ITimeDto } from './dto/timeDto'
import { mapTimeDto } from './maps/mapTimeDto'
import type { IRecordDto } from './dto/recordDto'
import { COMPANY_ID } from '@/shared/constants'

export const yclientApiInterface: IApiInterface = {
  async getServices(staffId) {
    let queryData: IQueryObject | null = null
    if (staffId) {
      queryData = {
        staff_id: staffId,
      }
    }
    const res = await apiInstance.get(`book_services/${COMPANY_ID}/`, queryData)

    const resData: IYclientResponse<IServicesData> = res.body

    return resData && resData.data
      ? resData.data.services.map((serviceDto) => mapServiceDto(serviceDto))
      : []
  },

  async getStaffs(serviceId) {
    let queryData: IQueryObject | null = null
    if (serviceId) {
      queryData = {
        service_ids: serviceId,
      }
    }
    const res = await apiInstance.get(`book_staff/${COMPANY_ID}/`, queryData)

    const resData: IYclientResponse<IStaffDto[]> = res.body

    return resData && resData.data
      ? resData.data.map((staffDto) => mapStaffDto(staffDto))
      : []
  },

  async getDays(serviceId, staffId): Promise<IDate[]> {
    const queryData: IQueryObject = {
      service_ids: serviceId,
      staff_id: staffId,
    }
    const res = await apiInstance.get(`book_dates/${COMPANY_ID}`, queryData)

    const resData: IYclientResponse<IDateData> = res.body
    return resData && resData.data
      ? resData.data.booking_dates.map((dateDto) => mapDateDto(dateDto))
      : []
  },

  async getTimes(serviceId, staffId, date): Promise<ITime[]> {
    const queryData: IQueryObject = {
      service_ids: serviceId,
    }
    const res = await apiInstance.get(
      `book_times/${COMPANY_ID}/${staffId}/${date}`,
      queryData
    )
    const resData: IYclientResponse<ITimeDto[]> = res.body

    return resData && resData.data
      ? resData.data.map((timeDto) => mapTimeDto(timeDto))
      : []
  },

  async getBookCode(phone, fulname) {
    const res = await apiInstance.post(`book_code/${COMPANY_ID}`, {
      phone,
      fulname,
    })

    const resData: IYclientResponse<undefined> = res.body
    return resData ? resData.success : false
  },
  async bookRecord(data): Promise<IRecordStatus> {
    const res = await apiInstance.post(`book_record/${COMPANY_ID}`, {
      phone: data.phone,
      fullname: data.fulname,
      email: '',
      code: +data.code,
      appointments: [
        {
          id: 1,
          staff_id: data.staffId,
          services: [data.serviceId],
          datetime: data.finaleDate,
        },
      ],
      client_agreements: {
        is_personal_data_processing_allowed: true,
      },
    })

    const resData: IYclientResponse<IRecordDto> = res.body

    return {
      success: resData.success,
      error: null,
    }
  },
}
