import { useSearchParams } from 'react-router-dom'
import { useCallback } from 'react'

/**
 * URL 쿼리스트링과 React 상태를 자동으로 동기화하는 커스텀 훅
 *
 * @template T - 쿼리 파라미터 객체 타입
 * @param defaults - 각 쿼리 파라미터의 기본값
 * @returns [params, setParams] - 현재 파라미터 값과 업데이트 함수

 */
export function useQueryParams<T extends Record<string, any>>(
  defaults: T
): [T, (updates: Partial<T>) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  /**
   * URL에서 파라미터 읽어 현재 상태 생성
   */
  const getParamsFromUrl = useCallback((): T => {
    const params = {} as T

    for (const key in defaults) {
      const urlValue = searchParams.get(key)

      if (urlValue !== null) {
        params[key] = urlValue as T[typeof key]
      } else {
        params[key] = defaults[key]
      }
    }

    return params
  }, [searchParams, defaults])

  const currentParams = getParamsFromUrl()

  /**
   * 파라미터 업데이트 함수
   */
  const updateParams = useCallback(
    (updates: Partial<T>) => {
      const newParams = { ...currentParams, ...updates }
      const urlParams = new URLSearchParams()

      for (const key in newParams) {
        const value = newParams[key]

        // undefined, null, 빈 문자열은 URL에서 제거
        if (value !== undefined && value !== null && value !== '') {
          urlParams.set(key, String(value))
        }
      }

      setSearchParams(urlParams)
    },
    [currentParams, setSearchParams]
  )

  return [currentParams, updateParams]
}
