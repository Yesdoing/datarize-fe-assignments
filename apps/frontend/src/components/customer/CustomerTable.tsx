import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Row,
  type HeaderGroup,
  type Header,
  type Cell,
} from '@tanstack/react-table'
import { ArrowUpIcon, ArrowDownIcon, ArrowUpDownIcon } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import type { Customer, SortOrder } from '@/apis/customer'
import { formatPrice } from '@/utils/formatPrice'

interface CustomerTableProps {
  customers: Customer[]
  sortBy: SortOrder
  onSortChange: (sort: SortOrder) => void
  onCustomerClick: (customerId: number) => void
}

export const CustomerTable = ({ customers, sortBy, onSortChange, onCustomerClick }: CustomerTableProps) => {
  const handleSortClick = () => {
    if (!sortBy) {
      onSortChange('desc')
    } else if (sortBy === 'desc') {
      onSortChange('asc')
    } else {
      onSortChange(undefined)
    }
  }

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: '이름',
    },
    {
      accessorKey: 'count',
      header: '총 구매 횟수',
      cell: ({ row }) => `${row.original.count}회`,
    },
    {
      accessorKey: 'totalAmount',
      header: () => {
        const Icon = sortBy === 'desc' ? ArrowDownIcon : sortBy === 'asc' ? ArrowUpIcon : ArrowUpDownIcon

        return (
          <Button variant="ghost" onClick={handleSortClick} className="h-auto p-0 hover:bg-transparent">
            총 구매 금액
            <Icon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }: { row: Row<Customer> }) => formatPrice(row.original.totalAmount),
    },
  ]

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<Customer>) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<Customer, unknown>) => (
                <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: Row<Customer>) => (
              <TableRow key={row.id} onClick={() => onCustomerClick(row.original.id)} className="cursor-pointer">
                {row.getVisibleCells().map((cell: Cell<Customer, unknown>) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                검색 결과가 없습니다
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
