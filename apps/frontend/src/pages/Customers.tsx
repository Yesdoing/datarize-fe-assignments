import CustomerList from "@/components/customer/CustomerList"

/**
 * Customers 페이지
 * 고객 목록을 표시하고 검색할 수 있는 페이지입니다.
 */
const Customers = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">고객 목록</h1>
        <p className="mt-2 text-gray-600">가장 많이 구매한 고객 목록을 확인하고 검색할 수 있습니다.</p>
      </header>
      <div className="bg-white rounded-lg shadow p-6">
        <CustomerList />
      </div>
    </div>
  )
}

export default Customers
