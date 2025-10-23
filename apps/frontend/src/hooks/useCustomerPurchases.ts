import { useQuery } from '@tanstack/react-query'
import { fetchCustomerPurchases } from '@/apis/customer'

export const useCustomerPurchases = (customerId: number) => {
  return useQuery({
    queryKey: ['customers', customerId, 'purchases'],
    queryFn: () => fetchCustomerPurchases(customerId),
  })
}
