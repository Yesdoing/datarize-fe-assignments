
import { Spinner } from '@/components/ui/Spinner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { formatPrice } from '@/utils/formatPrice'
import { formatDate } from '@/utils/formatDate'
import type { Purchase } from '@/apis/customer'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { useCustomerPurchases } from '@/hooks/useCustomerPurchases'
import { Button } from '@/components/ui/Button'

interface CustomerDetailModalProps {
  customerId: number
  open: boolean
  onClose: () => void
}

/**
 * 고객 구매 내역 상세 모달
 *
 * 선택한 고객의 구매 내역을 모달로 표시합니다.
 * - 총 구매 횟수 및 총 구매 금액 요약
 * - 개별 구매 내역 목록 (상품 이미지, 이름, 날짜, 수량, 가격)
 */
const CustomerDetailModal = ({ customerId, open, onClose }: CustomerDetailModalProps) => {
  const { data, isLoading, error, refetch } = useCustomerPurchases(customerId)

  // 총 구매 금액 계산
  const totalAmount = data?.reduce((sum, purchase) => sum + purchase.price, 0) ?? 0
  // 총 구매 횟수 계산 (수량의 합)
  const totalQuantity = data?.reduce((sum, purchase) => sum + purchase.quantity, 0) ?? 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] min-h-[400px] overflow-y-auto" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-2xl">고객 구매 내역</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center min-h-[300px]">
            <Spinner />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>구매 내역을 불러오는데 실패했습니다</AlertTitle>
            <AlertDescription>
              구매 내역을 불러오는데 실패했습니다. <Button onClick={() => refetch()}>다시 시도</Button>
            </AlertDescription>
          </Alert>
        )}

        {data && !isLoading && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">총 구매 횟수</p>
                <p className="text-2xl font-bold text-blue-600">{totalQuantity}회</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm">총 구매 금액</p>
                <p className="text-2xl font-bold text-green-600">{formatPrice(totalAmount)}</p>
              </div>
            </div>

            <div className="space-y-4">
              {data.map((purchase: Purchase, index: number) => (
                <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <img
                    src={`${purchase.imgSrc}`}
                    alt={purchase.product}
                    loading="lazy"
                    width={96}
                    height={96}
                    className="w-24 h-24 object-cover rounded-md"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{purchase.product}</h3>
                    <p className="text-sm text-gray-600 mt-1">구매 날짜: {formatDate(purchase.date)}</p>
                    <p className="text-sm text-gray-600">수량: {purchase.quantity}개</p>
                    <p className="text-lg font-bold text-primary-600 mt-2">{formatPrice(purchase.price)}</p>
                  </div>
                </div>
              ))}

              {data.length === 0 && (
                <div className="text-center py-12 text-gray-500">구매 내역이 없습니다</div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDetailModal;