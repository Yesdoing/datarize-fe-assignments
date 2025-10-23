import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { format, parseISO } from 'date-fns'

interface DateRangePickerProps {
  value: { from: string; to: string }
  onChange: (value: { from: string; to: string }) => void
}

/**
 * 날짜 범위 선택 컴포넌트
 *
 * 시작 날짜와 종료 날짜를 선택하고, 유효성을 검증한 후 조회합니다.
 * 날짜 순서 검증 및 에러 메시지 표시 기능을 포함합니다.
 */
const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  /**
   * ISO 8601 문자열을 Date 객체로 변환
   * 변환 실패 시 undefined 반환
   */
  const parseDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined
    try {
      return parseISO(dateStr)
    } catch {
      return undefined
    }
  }

  const [fromDate, setFromDate] = useState<Date | undefined>(parseDate(value.from))
  const [toDate, setToDate] = useState<Date | undefined>(parseDate(value.to))
  const [error, setError] = useState('')

  useEffect(() => {
    setFromDate(parseDate(value.from))
    setToDate(parseDate(value.to))
  }, [value.from, value.to])

  const handleApply = () => {
    // 둘 다 없으면 전체 기간 조회
    if (!fromDate && !toDate) {
      setError('')
      onChange({ from: '', to: '' })
      return
    }

    // 하나만 선택된 경우 에러
    if (!fromDate || !toDate) {
      setError('시작 날짜와 종료 날짜를 모두 선택해주세요')
      return
    }

    // 날짜 순서 검증: 시작일이 종료일보다 늦으면 에러
    if (fromDate > toDate) {
      setError('시작 날짜가 종료 날짜보다 늦을 수 없습니다')
      return
    }

    setError('')
    const fromString = format(fromDate, 'yyyy-MM-dd')
    const toString = format(toDate, 'yyyy-MM-dd')
    onChange({ from: fromString, to: toString })
  }

  const handleReset = () => {
    setFromDate(undefined)
    setToDate(undefined)
    setError('')
    onChange({ from: '', to: '' })
  }

  return (
    <div className=" p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm mb-1">시작 날짜</label>
          <DatePicker
            date={fromDate}
            setDate={setFromDate}
            placeholder="시작일 선택"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">종료 날짜</label>
          <DatePicker
            date={toDate}
            setDate={setToDate}
            placeholder="종료일 선택"
          />  
        </div>
        <div className="flex gap-2">
          <Button onClick={handleApply}>조회</Button>
          <Button variant="secondary" onClick={handleReset}>초기화</Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  )
}

export default DateRangePicker;

