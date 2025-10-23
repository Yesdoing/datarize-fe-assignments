# 쇼핑몰 구매 데이터 대시보드

쇼핑몰의 구매 데이터를 시각화하고 분석할 수 있는 대시보드 애플리케이션입니다.

## 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [시작하기](#시작하기)
- [주요 구현 사항](#주요-구현-사항)
- [API 명세](#api-명세)

## 주요 기능

### 1. 가격대별 구매 빈도 차트
- 📊 가격대별 구매 빈도를 바 차트로 시각화
- 📅 날짜 범위 선택을 통한 기간별 조회
- 🔗 URL 쿼리스트링 동기화 (공유 및 북마크 가능)
- ⚡ 로딩 상태 및 에러 처리

### 2. 고객 목록 및 검색
- 👥 고객 ID, 이름, 구매 횟수, 총 구매 금액 표시
- 🔍 이름 기반 실시간 검색 (Debounce 적용)
- ⬆️⬇️ 총 구매 금액 기준 정렬 (오름차순/내림차순)
- 🔗 검색 및 정렬 상태를 URL에 동기화

### 3. 고객 상세 구매 내역
- 🛒 고객별 상세 구매 내역 모달
- 🖼️ 상품 썸네일 및 상세 정보 표시
- 📋 구매 날짜, 수량, 가격 정보 제공

### 4. 사이드바 네비게이션
- 🧭 좌측 사이드바를 통한 페이지 전환
- 🎯 현재 활성화된 메뉴 하이라이트
- 📱 반응형 레이아웃

## 기술 스택

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript 5.2.2
- **Build Tool**: Vite 5.3.4
- **Routing**: React Router DOM 7.9.4
- **State Management**: TanStack Query (React Query) 5.90.5
- **Styling**: Tailwind CSS 4.1.15
- **UI Components**:
  - Radix UI (Dialog, Popover)
  - shadcn/ui 기반 커스텀 컴포넌트
  - Lucide React (아이콘)
- **Charts**: Recharts 2.15.4
- **Table**: TanStack Table 8.21.3
- **HTTP Client**: Axios 1.12.2
- **Date**: date-fns 4.1.0

## 프로젝트 구조

```
datarize-fe-assignments/
├── apps/
│   ├── backend/              # 백엔드 서버 (수정 금지)
│   ├── frontend/             # 프론트엔드 애플리케이션
│   │   └── src/
│   │       ├── apis/         # API 클라이언트
│   │       │   ├── client.ts
│   │       │   ├── customer.ts
│   │       │   └── chart.ts
│   │       ├── components/   # React 컴포넌트
│   │       │   ├── chart/    # 차트 관련 컴포넌트
│   │       │   │   ├── PurchaseFrequencyChart.tsx
│   │       │   │   └── DateRangePicker.tsx
│   │       │   ├── customer/ # 고객 관련 컴포넌트
│   │       │   │   ├── CustomerList.tsx
│   │       │   │   ├── CustomerTable.tsx
│   │       │   │   ├── CustomerSearchBar.tsx
│   │       │   │   └── CustomerDetailModal.tsx
│   │       │   ├── layout/   # 레이아웃 컴포넌트
│   │       │   │   ├── Layout.tsx
│   │       │   │   └── Sidebar.tsx
│   │       │   └── ui/       # 공통 UI 컴포넌트
│   │       ├── hooks/        # 커스텀 훅
│   │       │   ├── useQueryParams.ts    # URL 쿼리스트링 동기화
│   │       │   ├── useCustomers.ts
│   │       │   ├── usePurchaseFrequency.ts
│   │       │   ├── useCustomerPurchases.ts
│   │       │   └── useDebounce.ts
│   │       ├── pages/        # 페이지 컴포넌트
│   │       │   ├── Dashboard.tsx
│   │       │   ├── PurchaseFrequency.tsx
│   │       │   └── Customers.tsx
│   │       ├── utils/        # 유틸리티 함수
│   │       │   ├── formatPrice.ts
│   │       │   └── formatDate.ts
│   │       ├── App.tsx       # 루트 컴포넌트 (라우팅 설정)
│   │       └── main.tsx      # 엔트리 포인트
│   └── package.json
└── README.md
```

## 시작하기

### 사전 요구사항

- Node.js 20.13.1
- Yarn 1.22.22

### 설치 및 실행

1. **의존성 설치**
```bash
cd apps
yarn install
```

2. **백엔드 서버 실행** (터미널 1)
```bash
yarn start-server
```
서버는 `http://localhost:3000`에서 실행됩니다.

3. **프론트엔드 개발 서버 실행** (터미널 2)
```bash
yarn start-client
```
클라이언트는 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
cd apps/frontend
yarn build
```

빌드된 파일은 `apps/frontend/dist` 폴더에 생성됩니다.

## 주요 구현 사항

### 1. URL 쿼리스트링 동기화

모든 검색 및 필터 상태를 URL에 동기화하여 다음과 같은 이점을 제공합니다:

- **URL 공유**: 특정 검색 결과나 차트를 URL로 공유 가능
- **북마크**: 자주 보는 조건을 북마크 가능
- **브라우저 네비게이션**: 뒤로가기/앞으로가기로 이전 상태 복원
- **새로고침 시 상태 유지**: 페이지를 새로고침해도 상태 유지

**구현 예시**:
```typescript
// apps/frontend/src/hooks/useQueryParams.ts
const [params, setParams] = useQueryParams({
  name: '',
  sortBy: undefined as SortOrder
})
```

**URL 예시**:
- `/purchase-frequency?from=2024-07-01&to=2024-07-31`
- `/customers?name=홍길동&sortBy=desc`

### 2. React Query를 통한 데이터 관리

- 로딩 및 에러 상태 자동 관리
- 쿼리 키 기반 캐시 관리

```typescript
// apps/frontend/src/hooks/useCustomers.ts
export const useCustomers = (params: CustomerQueryParams) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
  })
}
```

### 3. Debounce를 통한 검색 최적화

사용자 입력 시 300ms 대기 후 검색을 실행하여 불필요한 API 호출을 방지합니다.

```typescript
// apps/frontend/src/hooks/useDebounce.ts
const debouncedValue = useDebounce(input, 300)
```

---

## 라이선스

이 프로젝트는 Datarize Frontend 과제 전형용으로 제작되었습니다.
