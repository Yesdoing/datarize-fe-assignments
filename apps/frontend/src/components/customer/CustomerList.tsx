import { useState } from 'react'

import type { SortOrder } from '@/apis/customer'
import CustomerSearchBar from '@/components/customer/CustomerSearchBar'
import CustomerTable from '@/components/customer/CustomerTable'
import CustomerDetailModal from '@/components/customer/CustomerDetailModal'
import { useCustomers } from '@/hooks/useCustomers'
import { useQueryParams } from '@/hooks/useQueryParams'
import { Spinner } from '@/components/ui/Spinner'
import { Alert, AlertTitle } from '@/components/ui/Alert' 

/**
 * 고객 목록 컴포넌트
 *
 * 검색, 정렬, 상세 모달 기능을 포함한 고객 목록을 표시합니다.
 * URL 쿼리스트링과 동기화되어 URL 공유, 북마크, 뒤로가기를 지원합니다.
 * - 이름 검색 (Debounce 적용)
 * - 총 구매 금액 기준 정렬
 * - 고객 클릭 시 상세 구매 내역 모달 표시
 */
const CustomerList = () => {
  const [params, setParams] = useQueryParams({
    name: '',
    sortBy: undefined as SortOrder,
  })

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const handleSearchChange = (name: string) => {
    setParams({ ...params, name })
  }

  const handleSortChange = (sortBy: SortOrder) => {
    setParams({ ...params, sortBy })
  }

  const { data, isLoading, error } = useCustomers({
    sortBy: params.sortBy,
    name: params.name || undefined,
  })

  return (
    <div className="space-y-4">
      <CustomerSearchBar value={params.name} onSearch={handleSearchChange} />

      <div className="bg-white rounded-lg">
        {isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner className="size-8" />
          </div>
        )}

        {error && (
          <Alert
            variant="destructive"
          >
            <AlertTitle>고객 목록을 불러오는데 실패했습니다</AlertTitle>
          </Alert>
        )}

        {data && !isLoading && (
          <CustomerTable
            customers={data}
            sortBy={params.sortBy}
            onSortChange={handleSortChange}
            onCustomerClick={setSelectedCustomerId}
          />
        )}
      </div>

      {selectedCustomerId && (
        <CustomerDetailModal
          customerId={selectedCustomerId}
          open={!!selectedCustomerId}
          onClose={() => setSelectedCustomerId(null)}
        />
      )}
    </div>
  )
}

export default CustomerList