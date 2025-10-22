import { apiClient } from './client'

export interface PurchaseFrequency {
  range: string
  count: number
}

export interface PurchaseFrequencyParams {
  from?: string
  to?: string
}

export const fetchPurchaseFrequency = async (params: PurchaseFrequencyParams = {}): Promise<PurchaseFrequency[]> => {
  const { data } = await apiClient.get<PurchaseFrequency[]>('/api/purchase-frequency', { params })
  return data
}
