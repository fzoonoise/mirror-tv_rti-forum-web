import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

// Basic checkbox
export const Default: Story = {
  render: () => <Checkbox />,
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">接受服務條款</Label>
    </div>
  ),
}

// Disabled states
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">停用狀態</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled checked />
        <Label htmlFor="disabled-checked">停用且已勾選</Label>
      </div>
    </div>
  ),
}

// Controlled checkbox
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="controlled"
            checked={checked}
            onCheckedChange={(value) => setChecked(value === true)}
          />
          <Label htmlFor="controlled">訂閱電子報</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          狀態: {checked ? '已勾選' : '未勾選'}
        </p>
      </div>
    )
  },
}

// Forum use cases
export const ForumUseCases: Story = {
  render: () => {
    const [notifications, setNotifications] = useState({
      replies: true,
      mentions: true,
      likes: false,
      newsletter: false,
    })

    return (
      <div className="space-y-4">
        <div>
          <h3 className="mb-3 text-sm font-medium">通知設定</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="replies"
                checked={notifications.replies}
                onCheckedChange={(value) =>
                  setNotifications({
                    ...notifications,
                    replies: value === true,
                  })
                }
              />
              <Label htmlFor="replies">有人回覆我的文章</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="mentions"
                checked={notifications.mentions}
                onCheckedChange={(value) =>
                  setNotifications({
                    ...notifications,
                    mentions: value === true,
                  })
                }
              />
              <Label htmlFor="mentions">有人提及我</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="likes"
                checked={notifications.likes}
                onCheckedChange={(value) =>
                  setNotifications({ ...notifications, likes: value === true })
                }
              />
              <Label htmlFor="likes">有人按讚我的內容</Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">隱私設定</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="public-profile" defaultChecked />
              <Label htmlFor="public-profile">公開個人檔案</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="show-activity" />
              <Label htmlFor="show-activity">顯示活動狀態</Label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium">發文選項</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="allow-comments" defaultChecked />
              <Label htmlFor="allow-comments">允許留言</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notify-followers" />
              <Label htmlFor="notify-followers">通知關注者</Label>
            </div>
          </div>
        </div>
      </div>
    )
  },
}
