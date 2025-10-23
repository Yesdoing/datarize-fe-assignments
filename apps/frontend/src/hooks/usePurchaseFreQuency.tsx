import { useQuery } from '@tanstack/react-query'
import { fetchPurchaseFrequency } from '@/apis/chart'
import type { PurchaseFrequencyParams } from '@/apis/chart'

export const usePurchaseFrequency = (params: PurchaseFrequencyParams) => {
  return useQuery({
    queryKey: ['purchase-frequency', params],
    queryFn: () => fetchPurchaseFrequency(params),
  })
}
