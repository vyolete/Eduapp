import { cn } from '../../lib/utils'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const Loading = ({ message, size = 'md', className }: LoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-b-2',
    lg: 'h-12 w-12 border-b-2',
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('animate-spin rounded-full border-primary', sizeClasses[size])}></div>
      {message && <p className="mt-4 text-sm text-gray-400">{message}</p>}
    </div>
  )
}

export { Loading }
