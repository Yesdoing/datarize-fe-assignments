import PurchaseFrequencyChart from "@/components/chart/PurchaseFrequencyChart"


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">쇼핑몰 구매 데이터 대시보드</h1>
          <p className="mt-1 text-sm text-gray-600">2024년 7월 구매 데이터 분석</p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">가격대별 구매 빈도</h2>
          <PurchaseFrequencyChart />
        </section>
      </main>
    </div>
  )
}

export default Dashboard