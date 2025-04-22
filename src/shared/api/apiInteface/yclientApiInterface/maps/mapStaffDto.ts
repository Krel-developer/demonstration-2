import type { IStaff } from '@/shared/types'
import type { IStaffDto } from '../dto/staffDto'

export function mapStaffDto(staffDto: IStaffDto): IStaff {
  return {
    id: staffDto.id,
    name: staffDto.name,
    specialization: staffDto.specialization,
    avatarSrc: staffDto.image_group.images
      ? staffDto.image_group.images.norm.path
      : staffDto.avatar_big,
  }
}
