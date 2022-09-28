import { ModelLike } from './../types/ModelLike';

export enum ProductType { MOVIE = 'MOVIE', BOOK = 'BOOK', DVD = 'DVD' }

export interface Product extends ModelLike {

  title: string
  type: ProductType
  category: string
  img: string
  priceSell: number
  priceRentPerDay: number
  isAvailableForSell: boolean
  isAvailableForRent: boolean

  qtdStock: number
  qtdRented: number

}