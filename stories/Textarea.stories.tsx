import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

// Basic textarea
export const Default: Story = {
  args: {
    placeholder: '輸入您的訊息...',
  },
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="message">訊息</Label>
      <Textarea id="message" placeholder="請輸入您的訊息" />
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: '此欄位已停用',
    disabled: true,
  },
}

// Forum use cases
export const ForumUseCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="post">發表新文章</Label>
        <Textarea
          id="post"
          placeholder="分享您的想法、問題或經驗..."
          className="min-h-[120px]"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            支援 Markdown 語法
          </span>
          <Button>發布文章</Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reply">回覆留言</Label>
        <Textarea
          id="reply"
          placeholder="輸入您的回覆..."
          className="min-h-[80px]"
        />
        <Button size="sm">送出回覆</Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">個人簡介</Label>
        <Textarea
          id="bio"
          placeholder="介紹一下自己..."
          className="min-h-[100px]"
          maxLength={500}
        />
        <span className="text-xs text-muted-foreground">最多 500 字</span>
      </div>
    </div>
  ),
}
