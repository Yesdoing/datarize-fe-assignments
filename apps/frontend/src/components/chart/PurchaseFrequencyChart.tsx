import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { usePurchaseFrequency } from '@/hooks/usePurchaseFrequency'
import { useQueryParams } from '@/hooks/useQueryParams'
import DateRangePicker from '@/components/chart/DateRangePicker'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Spinner } from '@/components/ui/Spinner'
import { Button } from '@/components/ui/Button'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/Chart'
import type { ChartConfig } from '@/components/ui/Chart'

/** 차트 색상 및 라벨 설정 */
const chartConfig = {
  count: {
    label: '구매 횟수',
    color: '#3b82f6',
  },
} satisfies ChartConfig

/**
 * 가격대별 구매 빈도 차트 컴포넌트
 *
 * 날짜 범위를 선택하여 해당 기간의 가격대별 구매 빈도를 바 차트로 시각화합니다.
 * URL 쿼리스트링과 동기화되어 URL 공유, 북마크, 뒤로가기를 지원합니다.
 * 로딩, 에러, 빈 데이터 상태를 모두 처리합니다.
 */
const PurchaseFrequencyChart = () => {
  const [params, setParams] = useQueryParams({
    from: '2024-07-01',
    to: '2024-07-31',
  })

  const handleDateRangeChange = (newRange: { from: string; to: string }) => {
    setParams(newRange)
  }

  const { data, isLoading, error, refetch } = usePurchaseFrequency(
    params.from && params.to ? params : {}
  )

  return (
    <div className="space-y-4">
      <DateRangePicker value={params} onChange={handleDateRangeChange} />
      <Card>
        <CardHeader>
          <CardTitle>구매 빈도 분석</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex h-64 items-center justify-center">
              <Spinner className="size-8" />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>
                차트 데이터를 불러오는데 실패했습니다
                <Button variant="ghost" size="sm" onClick={() => refetch()} className="mt-2">
                  다시 시도
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {data && !isLoading && (
            <>
              {data.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  해당 기간의 데이터가 없습니다
                </div>
              ) : (
                <ChartContainer config={chartConfig}>
                  <BarChart data={data} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="range"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      label={{ value: '구매 횟수', angle: -90, position: 'insideLeft' }}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value) => [`${value}회`, '구매 횟수']}
                    />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                  </BarChart>
                </ChartContainer>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PurchaseFrequencyChart