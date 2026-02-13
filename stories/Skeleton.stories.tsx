import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from '@/components/ui/skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// Basic shapes
export const BasicShapes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="h-12 w-[250px]" />
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-4 w-[300px]" />
    </div>
  ),
}

// Card skeleton
export const Card: Story = {
  render: () => (
    <div className="w-[350px] space-y-3 rounded-lg border p-4">
      <Skeleton className="h-[200px] w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  ),
}

// List skeleton
export const List: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  ),
}
