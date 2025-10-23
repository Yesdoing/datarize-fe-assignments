import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '@/apis/customer'
import type { CustomerQueryParams } from '@/apis/customer'

/**
 * 고객 목록을 조회하는 커스텀 훅
 * @param params - 조회 조건 (정렬 기준: sortBy, 검색어: name)
 * @returns UseQueryResult
 */
export const useCustomers = (params: CustomerQueryParams) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
  })
}
