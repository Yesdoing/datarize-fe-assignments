/**
 * 숫자를 한국 통화 형식으로 변환
 *
 * @param price - 변환할 금액 (숫자)
 * @returns 천 단위 구분자와 '원'이 포함된 문자열
 *
 * @example
 * formatPrice(10000) // "10,000원"
 * formatPrice(1234567) // "1,234,567원"
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ko-KR').format(price) + '원'
}
