export type Hemisphere = 'North' | 'South'

export type FilterType = 'All' | 'Now' | 'This month' | 'Last chance'

export interface FishData {
  id: number
  name: string
  price: number
  seasons: {
    North?: number[][]
    South?: number[][]
  }
  schedule: number[] | number[][]
  location: string
  shadow: string
  imageURL: string
}

export interface FishProps {
  id: number
  name: string
  price: number
  location: string
  shadow: string
  schedule: string
  seasons: string
  inWater: boolean
}
