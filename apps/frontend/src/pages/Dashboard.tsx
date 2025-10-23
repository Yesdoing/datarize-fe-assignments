import { Link } from "react-router-dom"

/**
 * Dashboard 페이지
 * 대시보드 홈 화면으로, 주요 기능들로 이동할 수 있는 카드를 제공합니다.
 */
const Dashboard = () => {
  const cards = [
    {
      to: "/purchase-frequency",
      title: "가격대별 구매 빈도",
      description: "상품 가격대별 구매 빈도를 차트로 확인할 수 있습니다.",
      color: "blue",
    },
    {
      to: "/customers",
      title: "고객 목록",
      description: "가장 많이 구매한 고객 목록을 조회하고 검색할 수 있습니다.",
      color: "green",
    },
  ]

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">쇼핑몰 구매 데이터 대시보드</h1>
        <p className="mt-2 text-gray-600">구매 데이터 분석 및 고객 관리를 위한 대시보드입니다.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          return (
            <Link
              key={card.to}
              to={card.to}
              className={'block p-6 bg-white rounded-lg hover:bg-gray-100'}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h2>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard