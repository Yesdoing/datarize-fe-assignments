import { useState } from 'react'

import type { SortOrder } from '@/apis/customer'
import CustomerSearchBar from '@/components/customer/CustomerSearchBar'
import CustomerTable from '@/components/customer/CustomerTable'
import CustomerDetailModal from '@/components/customer/CustomerDetailModal'
import { useCustomers } from '@/hooks/useCustomers'
import { Spinner } from '@/components/ui/Spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'

/**
 * 고객 목록 컴포넌트
 *
 * 검색, 정렬, 상세 모달 기능을 포함한 고객 목록을 표시합니다.
 * - 이름 검색 (Debounce 적용)
 * - 총 구매 금액 기준 정렬
 * - 고객 클릭 시 상세 구매 내역 모달 표시
 */
const CustomerList = () => {
  const [searchName, setSearchName] = useState('')
  const [sortBy, setSortBy] = useState<SortOrder>(undefined)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const { data, isLoading, error, refetch } = useCustomers({
    sortBy,
    name: searchName || undefined,
  })

  return (
    <div className="space-y-4">
      <CustomerSearchBar onSearch={setSearchName} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {isLoading && <Spinner />}

        {error && (
          <Alert
            variant="destructive"
          >
            <AlertTitle>고객 목록을 불러오는데 실패했습니다</AlertTitle>
            <AlertDescription>
              고객 목록을 불러오는데 실패했습니다. <Button onClick={() => refetch()}>다시 시도</Button>
            </AlertDescription>
          </Alert>
        )}

        {data && !isLoading && (
          <CustomerTable
            customers={data}
            sortBy={sortBy}
            onSortChange={setSortBy}
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