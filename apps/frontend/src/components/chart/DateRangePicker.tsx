import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { format } from 'date-fns'

interface DateRangePickerProps {
  onDateChange: (from: string, to: string) => void
  defaultFromDate?: string
  defaultToDate?: string
}

const DateRangePicker = ({
  onDateChange,
  defaultFromDate,
  defaultToDate
}: DateRangePickerProps) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(defaultFromDate ? new Date(defaultFromDate) : undefined)
  const [toDate, setToDate] = useState<Date | undefined>(defaultToDate ? new Date(defaultToDate) : undefined)
  const [error, setError] = useState('')

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
    onDateChange(fromString, toString)
  }

  const handleReset = () => {
    setFromDate(undefined)  
    setToDate(undefined)
    setError('')
    onDateChange('', '')
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

