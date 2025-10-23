import { useState } from 'react'

import type { SortOrder } from '@/apis/customer'
import CustomerSearchBar from '@/components/customer/CustomerSearchBar'
import CustomerTable from '@/components/customer/CustomerTable'
import CustomerDetailModal from '@/components/customer/CustomerDetailModal'
import { useCustomers } from '@/hooks/useCustomers'
import { Spinner } from '@/components/ui/Spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'

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