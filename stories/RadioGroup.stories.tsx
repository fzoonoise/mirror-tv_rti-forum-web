import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// Basic radio group
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">選項 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">選項 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">選項 3</Label>
      </div>
    </RadioGroup>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="d-option1" />
        <Label htmlFor="d-option1">可選擇</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="d-option2" disabled />
        <Label htmlFor="d-option2">已停用</Label>
      </div>
    </RadioGroup>
  ),
}

// Controlled radio group
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('comfortable')
    return (
      <div className="space-y-3">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="comfortable" />
            <Label htmlFor="comfortable">舒適</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="compact" />
            <Label htmlFor="compact">緊湊</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">
          已選擇: {value === 'comfortable' ? '舒適' : '緊湊'}
        </p>
      </div>
    )
  },
}

// Forum use cases
export const ForumUseCases: Story = {
  render: () => {
    const [postVisibility, setPostVisibility] = useState('public')
    const [sortBy, setSortBy] = useState('latest')

    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">文章可見度</h3>
          <RadioGroup value={postVisibility} onValueChange={setPostVisibility}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="font-normal">
                公開 - 所有人都可以看到
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="followers" id="followers" />
              <Label htmlFor="followers" className="font-normal">
                關注者 - 僅關注我的人可以看到
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="font-normal">
                私密 - 僅自己可見
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">排序方式</h3>
          <RadioGroup value={sortBy} onValueChange={setSortBy}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="latest" id="latest" />
              <Label htmlFor="latest" className="font-normal">
                最新優先
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular" className="font-normal">
                熱門優先
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unanswered" id="unanswered" />
              <Label htmlFor="unanswered" className="font-normal">
                待解答
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">通知頻率</h3>
          <RadioGroup defaultValue="instant">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="instant" id="instant" />
              <Label htmlFor="instant" className="font-normal">
                即時通知
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="font-normal">
                每日摘要
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="font-normal">
                每週摘要
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="never" id="never" />
              <Label htmlFor="never" className="font-normal">
                不接收通知
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">內容分級</h3>
          <RadioGroup defaultValue="general">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="general" id="general" />
              <Label htmlFor="general" className="font-normal">
                普遍級
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sensitive" id="sensitive" />
              <Label htmlFor="sensitive" className="font-normal">
                敏感內容（需標記）
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    )
  },
}
