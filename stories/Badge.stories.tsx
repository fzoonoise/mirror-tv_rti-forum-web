import type { Meta, StoryObj } from '@storybook/react'
import { CheckCircle2, XCircle } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// Default variant
export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

// All variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

// Forum post status
export const PostStatus: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>熱門</Badge>
      <Badge variant="secondary">新文章</Badge>
      <Badge variant="outline">已解決</Badge>
    </div>
  ),
}

// Category tags
export const CategoryTags: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline">技術討論</Badge>
      <Badge variant="outline">新聞</Badge>
      <Badge variant="outline">問答</Badge>
      <Badge variant="outline">公告</Badge>
    </div>
  ),
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>
        <CheckCircle2 className="mr-1 h-3 w-3" />
        已驗證
      </Badge>
      <Badge variant="destructive">
        <XCircle className="mr-1 h-3 w-3" />
        已封鎖
      </Badge>
    </div>
  ),
}

// Notification count
export const NotificationCount: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative inline-block">
        <button className="rounded-lg bg-secondary px-4 py-2">通知</button>
        <Badge className="absolute -top-2 -right-2 h-5 w-5 items-center justify-center rounded-full p-0">
          3
        </Badge>
      </div>
      <div className="relative inline-block">
        <button className="rounded-lg bg-secondary px-4 py-2">訊息</button>
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 items-center justify-center rounded-full p-0"
        >
          9
        </Badge>
      </div>
    </div>
  ),
}

// Member role badges
export const MemberRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">管理員</span>
        <Badge variant="destructive">Admin</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">版主</span>
        <Badge>Moderator</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">進階會員</span>
        <Badge variant="secondary">Premium</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">一般會員</span>
        <Badge variant="outline">Member</Badge>
      </div>
    </div>
  ),
}

// Interactive badges (clickable)
export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge className="cursor-pointer hover:opacity-80">點擊篩選</Badge>
      <Badge variant="outline" className="cursor-pointer hover:bg-accent">
        可點擊
      </Badge>
    </div>
  ),
}
