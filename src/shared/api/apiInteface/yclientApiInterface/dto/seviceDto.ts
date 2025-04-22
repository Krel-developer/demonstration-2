export interface IServiceDto {
  id: number
  title: string
  category_id: number
  price_min: number
  price_max: number
  discount: number
  comment: string
  weight: number
  active: number
  sex: number
  image: string
  prepaid: string
  seance_length: null
  abonement_restriction: number
  prepaid_settings: {
    status: string
    prepaid_full: {
      amount: number
      currency: string
    }
    prepaid_min: {
      amount: number
      percent: number
      currency: string
    }
  }
  is_composite: boolean
  composite_details: null
}
export interface IServicesData {
  events: string[]
  services: IServiceDto[]
  category: {
    id: number
    title: string
    sex: number
    api_id: number
    weight: number
  }[]
}
