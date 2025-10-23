import { Outlet } from "react-router-dom"
import Sidebar from "@/components/layout/Sidebar"

/**
 * Layout 컴포넌트
 * 사이드바와 메인 콘텐츠 영역을 포함하는 전체 레이아웃을 제공합니다.
 */
const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
