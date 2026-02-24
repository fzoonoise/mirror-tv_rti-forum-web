import type { Meta, StoryObj } from '@storybook/react'
import { Eye, EyeOff, Mail, Search } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// Default input
export const Default: Story = {
  args: {
    placeholder: '請輸入文字',
  },
}

// Input types
export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>文字輸入</Label>
        <Input type="text" placeholder="請輸入文字" />
      </div>
      <div className="space-y-2">
        <Label>電子郵件</Label>
        <Input type="email" placeholder="email@example.com" />
      </div>
      <div className="space-y-2">
        <Label>密碼</Label>
        <Input type="password" placeholder="請輸入密碼" />
      </div>
      <div className="space-y-2">
        <Label>數字</Label>
        <Input type="number" placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label>電話</Label>
        <Input type="tel" placeholder="0912-345-678" />
      </div>
      <div className="space-y-2">
        <Label>網址</Label>
        <Input type="url" placeholder="https://example.com" />
      </div>
    </div>
  ),
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">電子郵件</Label>
      <Input type="email" id="email" placeholder="email@example.com" />
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
        用戶名稱將顯示在您的個人資料頁面上
      </p>
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="停用的輸入框" disabled />
      <Input value="有預設值的停用輸入框" disabled />
    </div>
  ),
}

// With icon (search)
export const SearchInput: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="搜尋文章、用戶..." className="pl-10" />
    </div>
  ),
}

// With icon (email)
export const WithPrefixIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input type="email" placeholder="email@example.com" className="pl-10" />
    </div>
  ),
}

// Password with toggle visibility
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative w-full max-w-sm">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="請輸入密碼"
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    )
  },
}

// With button (newsletter)
export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="email@example.com" />
      <Button type="submit">訂閱</Button>
    </div>
  ),
}

// Error state
export const ErrorState: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-error">電子郵件</Label>
      <Input
        type="email"
        id="email-error"
        placeholder="email@example.com"
        className="border-red-500 focus-visible:ring-red-500"
      />
      <p className="text-sm text-red-500">請輸入有效的電子郵件地址</p>
    </div>
  ),
}

// Success state
export const SuccessState: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-success">電子郵件</Label>
      <Input
        type="email"
        id="email-success"
        placeholder="email@example.com"
        className="border-green-500 focus-visible:ring-green-500"
        value="valid@example.com"
      />
      <p className="text-sm text-green-600">電子郵件地址有效</p>
    </div>
  ),
}

// File upload
export const FileUpload: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">上傳圖片</Label>
      <Input id="picture" type="file" accept="image/*" />
    </div>
  ),
}

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="小尺寸" className="h-8 text-xs" />
      <Input placeholder="預設尺寸 (h-9)" />
      <Input placeholder="大尺寸" className="h-11 text-base" />
    </div>
  ),
}

// Full width vs fixed width
export const Widths: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label>全寬度</Label>
        <Input placeholder="全寬度輸入框" className="w-full" />
      </div>
      <div>
        <Label>固定寬度</Label>
        <Input placeholder="固定寬度 (w-64)" className="w-64" />
      </div>
      <div>
        <Label>小寬度</Label>
        <Input placeholder="小寬度 (w-32)" className="w-32" />
      </div>
    </div>
  ),
}

// Form example (login)
export const LoginForm: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4 rounded-lg border p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">登入</h2>
        <p className="text-sm text-muted-foreground">輸入您的帳號資訊以登入</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">電子郵件</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">密碼</Label>
          <Input id="login-password" type="password" placeholder="請輸入密碼" />
        </div>
        <Button className="w-full">登入</Button>
      </div>
    </div>
  ),
}
