import type { Meta, StoryObj } from '@storybook/react'
import { Loader, LoaderCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// Different spinner types
export const SpinnerTypes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner className="size-8" />
        <p className="mt-2 text-xs text-muted-foreground">Default (Loader2)</p>
      </div>
      <div className="text-center">
        <Spinner icon={Loader} className="size-8" />
        <p className="mt-2 text-xs text-muted-foreground">Loader</p>
      </div>
      <div className="text-center">
        <Spinner icon={LoaderCircle} className="size-8" />
        <p className="mt-2 text-xs text-muted-foreground">LoaderCircle</p>
      </div>
      <div className="text-center">
        <Spinner icon={RefreshCw} className="size-8" />
        <p className="mt-2 text-xs text-muted-foreground">RefreshCw</p>
      </div>
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner className="size-4" />
        <p className="mt-2 text-xs text-muted-foreground">16px</p>
      </div>
      <div className="text-center">
        <Spinner className="size-6" />
        <p className="mt-2 text-xs text-muted-foreground">24px</p>
      </div>
      <div className="text-center">
        <Spinner className="size-8" />
        <p className="mt-2 text-xs text-muted-foreground">32px</p>
      </div>
      <div className="text-center">
        <Spinner className="size-12" />
        <p className="mt-2 text-xs text-muted-foreground">48px</p>
      </div>
    </div>
  ),
}

// Button loading
export const ButtonLoading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>
        <Spinner className="mr-2" />
        載入中
      </Button>
      <Button variant="secondary" disabled>
        <Spinner icon={RefreshCw} className="mr-2" />
        重新整理
      </Button>
      <Button variant="outline" disabled>
        <Spinner icon={LoaderCircle} className="mr-2" />
        處理中
      </Button>
    </div>
  ),
}
