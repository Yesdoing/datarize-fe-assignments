import { useQuery } from '@tanstack/react-query'
import { fetchCustomers } from '@/apis/customer'
import type { CustomerQueryParams } from '@/apis/customer'

export const useCustomers = (params: CustomerQueryParams) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
  })
}
