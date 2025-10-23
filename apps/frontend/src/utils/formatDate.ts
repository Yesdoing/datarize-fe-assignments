import { format, parseISO } from 'date-fns'

/**
 * ISO 날짜 문자열을 YYYY-MM-DD 형식으로 변환
 */
export const formatDate = (date: string): string => {
  return format(parseISO(date), 'yyyy-MM-dd')
}
