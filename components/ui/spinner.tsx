import { Loader2Icon, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type SpinnerProps = {
  icon?: LucideIcon
} & Omit<React.ComponentProps<'svg'>, 'ref'>

function Spinner({ icon: Icon = Loader2Icon, className, ...props }: SpinnerProps) {
  return (
    <Icon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  )
}

export { Spinner }
