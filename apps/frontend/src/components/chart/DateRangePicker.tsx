import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { format, parseISO } from 'date-fns'

interface DateRangePickerProps {
  value: { from: string; to: string }
  onChange: (value: { from: string; to: string }) => void
}

const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
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
    if (!fromDate || !toDate) {
      setError('날짜를 선택해주세요')
      return
    }

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

