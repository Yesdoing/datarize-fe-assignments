import { format, parseISO } from 'date-fns'

/**
 * ISO 날짜 문자열을 YYYY-MM-DD 형식으로 변환
 */
export const formatDate = (date: string): string => {
  return format(parseISO(date), 'yyyy-MM-dd')
}

/**
 * Date 객체를 ISO 날짜 문자열로 변환 (API 전송용)
 */
export const toISODate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}
