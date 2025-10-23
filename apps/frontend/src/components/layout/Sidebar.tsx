import { NavLink } from "react-router-dom"

/**
 * Sidebar 컴포넌트
 * 좌측 사이드바 네비게이션 메뉴를 제공합니다.
 */
const Sidebar = () => {
  const menuItems = [
    {
      to: "/",
      label: "대시보드",
    },
    {
      to: "/purchase-frequency",
      label: "가격대별 구매 빈도",
    },
    {
      to: "/customers",
      label: "고객 목록",
    },
  ]

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">쇼핑몰 대시보드</h1>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={'flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100'}
                >
                  <span>{item.label}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
