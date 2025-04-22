import type { IService } from '@/shared/types'
import type { IServiceDto } from '../dto/seviceDto'

export function mapServiceDto(serviceDto: IServiceDto): IService {
  return {
    id: serviceDto.id,
    title: serviceDto.title,
  }
}
