import { cn } from '../../lib/utils'
import { forwardRef } from 'react'

const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      >
        <thead className="[&_tr]:border-b">
          <tr className="border-b border-gray-700">
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">
              <span className="sr-only">Select</span>
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          <tr className="border-b border-gray-700">
            <td className="p-4 align-middle text-gray-300" colSpan={2}>
              No data available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
)
Table.displayName = 'Table'

const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  )
)
TableHeader.displayName = 'TableHeader'

const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
)
TableBody.displayName = 'TableBody'

const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement> & { hover?: boolean }>(
  ({ className, hover = true, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-gray-700 transition-colors hover:bg-gray-800/50 data-[state=selected]:bg-gray-800',
        hover && 'hover:bg-gray-800/50',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'TableRow'

const TableHead = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-gray-400',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'TableHead'

const TableCell = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle text-gray-300', className)}
      {...props}
    />
  )
)
TableCell.displayName = 'TableCell'

const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-gray-400', className)}
      {...props}
    />
  )
)
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
