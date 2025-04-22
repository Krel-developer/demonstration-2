interface IStaffImg {
  id: number
  path: string
  width: number
  height: number
  type: string
  image_group_id: number
  version: string
}

export interface IStaffDto {
  id: number
  api_id: null
  name: string
  specialization: string
  rating: number
  show_rating: number
  user_id: null
  avatar: string
  avatar_big: string
  comments_count: number
  votes_count: number
  bookable: true
  image_group: {
    id: number
    entity: string
    entity_id: number
    images: {
      sm: IStaffImg
      norm: IStaffImg
      origin: IStaffImg
    }
  }
  information: string
}
