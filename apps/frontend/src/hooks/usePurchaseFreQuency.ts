import { useQuery } from '@tanstack/react-query'
import { fetchPurchaseFrequency } from '@/apis/chart'
import type { PurchaseFrequencyParams } from '@/apis/chart'

/**
 * 가격대별 구매 빈도 데이터를 조회하는 커스텀 훅
 * @param params - 조회 조건 (날짜 범위: from, to)
 * @returns UseQueryResult
 */
export const usePurchaseFrequency = (params: PurchaseFrequencyParams) => {
  return useQuery({
    queryKey: ['purchase-frequency', params],
    queryFn: () => fetchPurchaseFrequency(params),
  })
}
