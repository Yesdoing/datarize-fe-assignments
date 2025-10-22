import { apiClient } from './client'

export interface Customer {
  id: number
  name: string
  count: number
  totalAmount: number
}

export interface Purchase {
  date: string
  quantity: number
  product: string
  price: number
  imgSrc: string
}

export interface CustomerQueryParams {
  sortBy?: SortOrder
  name?: string
}

export type SortOrder = 'asc' | 'desc' | undefined

export const fetchCustomers = async (params: CustomerQueryParams): Promise<Customer[]> => {
  const { data } = await apiClient.get<Customer[]>('/api/customers', { params })
  return data
}

export const fetchCustomerPurchases = async (customerId: number): Promise<Purchase[]> => {
  const { data } = await apiClient.get<Purchase[]>(`/api/customers/${customerId}/purchases`)
  return data
}
