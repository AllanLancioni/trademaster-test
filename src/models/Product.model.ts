export type ProductType = 'MOVIE' | 'BOOK' | 'DVD'
export interface Product {

  title: string
  type: ProductType
  category: string
  img: string | null
  priceSell: number
  priceRentPerDay: number
  isAvailableForSell: boolean
  isAvailableForRent: boolean

  qtyStock: number
  qtyRented: number

}