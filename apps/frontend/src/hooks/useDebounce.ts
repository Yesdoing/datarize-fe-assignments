import { useEffect, useState } from 'react'

/** 기본 디바운스 지연 시간 (밀리초) */
const DEBOUNCE_DELAY = 300

/**
 * 입력 값의 변경을 지연시켜 불필요한 API 호출을 방지하는 커스텀 훅
 *
 * 사용자가 입력을 멈춘 후 지정된 시간이 지나면 값을 업데이트합니다.
 * 주로 검색창에서 타이핑할 때마다 API를 호출하지 않고,
 * 입력이 완료된 후에만 호출하도록 최적화하는 데 사용됩니다.
 *
 * @template T - debounce할 값의 타입
 * @param value - debounce할 값
 * @param delay - 지연 시간 (밀리초, 기본값: 300ms)
 * @returns 지연된 값
 */
export function useDebounce<T>(value: T, delay: number = DEBOUNCE_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
