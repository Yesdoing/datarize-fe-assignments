import { useQuery } from '@tanstack/react-query'
import { fetchCustomerPurchases } from '@/apis/customer'

/**
 * 특정 고객의 구매 내역을 조회하는 커스텀 훅
 * @param customerId - 조회할 고객 ID
 * @returns UseQueryResult
 */
export const useCustomerPurchases = (customerId: number) => {
  return useQuery({
    queryKey: ['customers', customerId, 'purchases'],
    queryFn: () => fetchCustomerPurchases(customerId),
  })
}
