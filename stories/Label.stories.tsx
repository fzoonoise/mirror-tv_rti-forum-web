import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

// Basic label
export const Default: Story = {
  args: {
    children: '標籤文字',
  },
}

// With input (vertical layout)
export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">電子郵件</Label>
      <Input type="email" id="email" placeholder="email@example.com" />
    </div>
  ),
}

// With textarea
export const WithTextarea: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="message">訊息</Label>
      <Textarea id="message" placeholder="請輸入您的訊息" />
    </div>
  ),
}

// With helper text
export const WithHelperText: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username">用戶名稱</Label>
      <Input type="text" id="username" placeholder="請輸入用戶名稱" />
      <p className="text-sm text-muted-foreground">
        用戶名稱長度需介於 3-20 個字元
      </p>
    </div>
  ),
}

// Required field
export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required-field">
        姓名 <span className="text-red-500">*</span>
      </Label>
      <Input type="text" id="required-field" placeholder="請輸入姓名" />
      <p className="text-xs text-muted-foreground">此欄位為必填</p>
    </div>
  ),
}

// Optional field
export const Optional: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="optional-field">
        公司名稱 <span className="text-muted-foreground">(選填)</span>
      </Label>
      <Input type="text" id="optional-field" placeholder="請輸入公司名稱" />
    </div>
  ),
}

// With checkbox
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="terms"
        className="h-4 w-4 rounded border-gray-300"
      />
      <Label htmlFor="terms" className="cursor-pointer">
        我同意服務條款及隱私政策
      </Label>
    </div>
  ),
}

// With radio buttons
export const WithRadioButtons: Story = {
  render: () => (
    <div className="space-y-3">
      <Label>選擇您的訂閱方案</Label>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="plan-free"
            name="plan"
            value="free"
            className="h-4 w-4"
          />
          <Label htmlFor="plan-free" className="cursor-pointer font-normal">
            免費方案
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="plan-pro"
            name="plan"
            value="pro"
            className="h-4 w-4"
          />
          <Label htmlFor="plan-pro" className="cursor-pointer font-normal">
            專業方案
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="plan-enterprise"
            name="plan"
            value="enterprise"
            className="h-4 w-4"
          />
          <Label
            htmlFor="plan-enterprise"
            className="cursor-pointer font-normal"
          >
            企業方案
          </Label>
        </div>
      </div>
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled-input" className="opacity-50">
        停用的輸入框
      </Label>
      <Input
        type="text"
        id="disabled-input"
        placeholder="無法輸入"
        disabled
        className="peer"
      />
    </div>
  ),
}

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="error-input" className="text-red-600">
        電子郵件
      </Label>
      <Input
        type="email"
        id="error-input"
        placeholder="email@example.com"
        className="border-red-500 focus-visible:ring-red-500"
      />
      <p className="text-sm text-red-500">請輸入有效的電子郵件地址</p>
    </div>
  ),
}

// Horizontal layout
export const HorizontalLayout: Story = {
  render: () => (
    <div className="flex w-full max-w-md items-center gap-4">
      <Label htmlFor="horizontal-input" className="w-32 text-right">
        用戶名稱
      </Label>
      <Input
        type="text"
        id="horizontal-input"
        placeholder="請輸入用戶名稱"
        className="flex-1"
      />
    </div>
  ),
}

// Multiple fields
export const FormFields: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="form-name">
          姓名 <span className="text-red-500">*</span>
        </Label>
        <Input type="text" id="form-name" placeholder="請輸入姓名" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-email">
          電子郵件 <span className="text-red-500">*</span>
        </Label>
        <Input type="email" id="form-email" placeholder="email@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-phone">
          電話 <span className="text-muted-foreground">(選填)</span>
        </Label>
        <Input type="tel" id="form-phone" placeholder="0912-345-678" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="form-message">訊息</Label>
        <Textarea id="form-message" placeholder="請輸入您的訊息" />
      </div>
    </div>
  ),
}

// Different font sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-xs">小尺寸標籤 (text-xs)</Label>
        <Input placeholder="輸入框" />
      </div>
      <div className="space-y-2">
        <Label className="text-sm">預設標籤 (text-sm)</Label>
        <Input placeholder="輸入框" />
      </div>
      <div className="space-y-2">
        <Label className="text-base">大尺寸標籤 (text-base)</Label>
        <Input placeholder="輸入框" />
      </div>
    </div>
  ),
}

// With description
export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <div className="space-y-1">
        <Label htmlFor="with-desc">個人簡介</Label>
        <p className="text-sm text-muted-foreground">
          簡短介紹您自己，這將顯示在您的個人資料頁面上
        </p>
      </div>
      <Textarea id="with-desc" placeholder="輸入您的個人簡介" />
      <p className="text-xs text-muted-foreground">最多 200 字元</p>
    </div>
  ),
}
