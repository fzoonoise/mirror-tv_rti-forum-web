import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Basic select
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="選擇水果" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">蘋果</SelectItem>
        <SelectItem value="banana">香蕉</SelectItem>
        <SelectItem value="orange">橘子</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="fruit">選擇水果</Label>
      <Select>
        <SelectTrigger id="fruit">
          <SelectValue placeholder="請選擇" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">蘋果</SelectItem>
          <SelectItem value="banana">香蕉</SelectItem>
          <SelectItem value="orange">橘子</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// With groups
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="選擇食物" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>水果</SelectLabel>
          <SelectItem value="apple">蘋果</SelectItem>
          <SelectItem value="banana">香蕉</SelectItem>
          <SelectItem value="orange">橘子</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>蔬菜</SelectLabel>
          <SelectItem value="carrot">胡蘿蔔</SelectItem>
          <SelectItem value="broccoli">花椰菜</SelectItem>
          <SelectItem value="spinach">菠菜</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="已停用" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">蘋果</SelectItem>
        <SelectItem value="banana">香蕉</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// With disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="選擇選項" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">可用選項</SelectItem>
        <SelectItem value="option2" disabled>
          已停用選項
        </SelectItem>
        <SelectItem value="option3">另一個可用選項</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// Different widths
export const Widths: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Label>小寬度 (w-32)</Label>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="選擇" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">選項 1</SelectItem>
            <SelectItem value="2">選項 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>中寬度 (w-64)</Label>
        <Select>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="選擇選項" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">選項 1</SelectItem>
            <SelectItem value="2">選項 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>全寬度 (w-full)</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="選擇選項" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">選項 1</SelectItem>
            <SelectItem value="2">選項 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

// Forum category selection
export const ForumCategory: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="category">文章分類</Label>
      <Select>
        <SelectTrigger id="category">
          <SelectValue placeholder="選擇分類" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>技術討論</SelectLabel>
            <SelectItem value="frontend">前端開發</SelectItem>
            <SelectItem value="backend">後端開發</SelectItem>
            <SelectItem value="devops">DevOps</SelectItem>
            <SelectItem value="mobile">行動開發</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>其他</SelectLabel>
            <SelectItem value="news">新聞</SelectItem>
            <SelectItem value="qa">問答</SelectItem>
            <SelectItem value="announcement">公告</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Sort options
export const SortOptions: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Label htmlFor="sort">排序</Label>
      <Select defaultValue="latest">
        <SelectTrigger id="sort" className="w-[150px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">最新</SelectItem>
          <SelectItem value="popular">熱門</SelectItem>
          <SelectItem value="replies">最多回覆</SelectItem>
          <SelectItem value="oldest">最舊</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}

// Multiple selects (form)
export const MultipleSelects: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="country">國家</Label>
        <Select>
          <SelectTrigger id="country">
            <SelectValue placeholder="選擇國家" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tw">台灣</SelectItem>
            <SelectItem value="us">美國</SelectItem>
            <SelectItem value="jp">日本</SelectItem>
            <SelectItem value="kr">韓國</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="language">語言</Label>
        <Select>
          <SelectTrigger id="language">
            <SelectValue placeholder="選擇語言" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zh-TW">繁體中文</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
            <SelectItem value="ko">한국어</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="timezone">時區</Label>
        <Select>
          <SelectTrigger id="timezone">
            <SelectValue placeholder="選擇時區" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="utc+8">UTC+8 (台北)</SelectItem>
            <SelectItem value="utc-5">UTC-5 (紐約)</SelectItem>
            <SelectItem value="utc+9">UTC+9 (東京)</SelectItem>
            <SelectItem value="utc">UTC (倫敦)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
}

// Long list with scroll
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="選擇國家" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="tw">台灣</SelectItem>
        <SelectItem value="cn">中國</SelectItem>
        <SelectItem value="hk">香港</SelectItem>
        <SelectItem value="mo">澳門</SelectItem>
        <SelectItem value="jp">日本</SelectItem>
        <SelectItem value="kr">韓國</SelectItem>
        <SelectItem value="sg">新加坡</SelectItem>
        <SelectItem value="my">馬來西亞</SelectItem>
        <SelectItem value="th">泰國</SelectItem>
        <SelectItem value="vn">越南</SelectItem>
        <SelectItem value="ph">菲律賓</SelectItem>
        <SelectItem value="id">印尼</SelectItem>
        <SelectItem value="us">美國</SelectItem>
        <SelectItem value="uk">英國</SelectItem>
        <SelectItem value="fr">法國</SelectItem>
        <SelectItem value="de">德國</SelectItem>
        <SelectItem value="au">澳洲</SelectItem>
        <SelectItem value="ca">加拿大</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// With default value
export const WithDefaultValue: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>已預選的選項</Label>
      <Select defaultValue="banana">
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">蘋果</SelectItem>
          <SelectItem value="banana">香蕉</SelectItem>
          <SelectItem value="orange">橘子</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
