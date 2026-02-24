import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

// Default spinner
export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Spinner className="size-8" />
        <p className="mt-2 text-xs text-muted-foreground">Default (Loader2)</p>
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
        <Spinner className="mr-2" />
        處理中
      </Button>
      <Button variant="outline" disabled>
        <Spinner className="mr-2" />
        請稍候
      </Button>
    </div>
  ),
}
