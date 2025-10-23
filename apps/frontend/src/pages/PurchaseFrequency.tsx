import PurchaseFrequencyChart from "@/components/chart/PurchaseFrequencyChart"

/**
 * PurchaseFrequency 페이지
 * 가격대별 구매 빈도 차트를 표시하는 페이지입니다.
 */
const PurchaseFrequency = () => {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">가격대별 구매 빈도</h1>
        <p className="mt-2 text-gray-600">상품 가격대별 구매 빈도를 시각화하여 보여줍니다.</p>
      </header>
      <div className="bg-white rounded-lg shadow p-6">
        <PurchaseFrequencyChart />
      </div>
    </div>
  )
}

export default PurchaseFrequency
