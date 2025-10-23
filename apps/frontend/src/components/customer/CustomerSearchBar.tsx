import { useState, useEffect } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/Input'


interface CustomerSearchBarProps {
  onSearch: (name: string) => void
}

/**
 * 고객 이름 검색 입력 컴포넌트
 *
 * Debounce를 적용하여 입력 후 300ms 대기 후 검색을 실행합니다.
 * 이를 통해 타이핑 중 불필요한 API 호출을 방지합니다.
 */
const CustomerSearchBar = ({ onSearch }: CustomerSearchBarProps) => {
  const [input, setInput] = useState('')
  const debouncedValue = useDebounce(input, 300)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none z-10" />
      <Input
        type="text"
        placeholder="검색할 고객 이름을 입력해주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="pl-10"
        aria-label="고객 이름 검색"
      />
    </div>
  )
}

export default CustomerSearchBar;