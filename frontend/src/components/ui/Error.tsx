import { cn } from '../../lib/utils'
import { AlertCircle } from 'lucide-react'

interface ErrorProps {
  message: string
  title?: string
  className?: string
}

const Error = ({ message, title = 'Error', className }: ErrorProps) => {
  return (
    <div className={cn('rounded-lg border border-danger bg-danger/10 p-4', className)}>
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-danger" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-danger">{title}</h3>
          <div className="mt-2 text-sm text-danger/80">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Error }
