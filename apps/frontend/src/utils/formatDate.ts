import { format, parseISO } from 'date-fns'

/**
 * ISO 8601 날짜 문자열을 YYYY-MM-DD 형식으로 변환
 *
 * @param date - ISO 8601 형식의 날짜 문자열 (예: "2024-07-15T00:00:00.000Z")
 * @returns YYYY-MM-DD 형식의 날짜 문자열 (예: "2024-07-15")
 *
 * @example
 * formatDate("2024-07-15T00:00:00.000Z") // "2024-07-15"
 */
export const formatDate = (date: string): string => {
  return format(parseISO(date), 'yyyy-MM-dd')
}
