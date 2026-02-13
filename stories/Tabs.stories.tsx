import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// Basic tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="posts" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="posts">文章</TabsTrigger>
        <TabsTrigger value="replies">回覆</TabsTrigger>
        <TabsTrigger value="saved">收藏</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <p className="text-sm text-muted-foreground">您發布的文章列表</p>
      </TabsContent>
      <TabsContent value="replies">
        <p className="text-sm text-muted-foreground">您的回覆記錄</p>
      </TabsContent>
      <TabsContent value="saved">
        <p className="text-sm text-muted-foreground">已收藏的內容</p>
      </TabsContent>
    </Tabs>
  ),
}

// Tabs with cards
export const WithCards: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">總覽</TabsTrigger>
        <TabsTrigger value="analytics">數據分析</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>帳戶總覽</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">發表文章</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">獲得讚數</span>
              <span className="font-medium">328</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>本週數據</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">瀏覽次數</span>
              <span className="font-medium">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">新增關注</span>
              <span className="font-medium">18</span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
}

// Forum categories
export const ForumCategories: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">全部</TabsTrigger>
        <TabsTrigger value="trending">熱門</TabsTrigger>
        <TabsTrigger value="following">關注中</TabsTrigger>
        <TabsTrigger value="unanswered">待解答</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">如何使用新功能？</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            2 小時前 · 5 則回覆
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">分享我的專案經驗</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            5 小時前 · 12 則回覆
          </p>
        </div>
      </TabsContent>
      <TabsContent value="trending">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">🔥 本週最熱門討論</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            1 天前 · 89 則回覆
          </p>
        </div>
      </TabsContent>
      <TabsContent value="following">
        <p className="text-sm text-muted-foreground">您關注的使用者動態</p>
      </TabsContent>
      <TabsContent value="unanswered">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">需要協助：API 整合問題</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            3 小時前 · 尚無回覆
          </p>
          <Button size="sm" className="mt-2">
            回答問題
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
}
