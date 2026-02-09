import type { Meta, StoryObj } from '@storybook/react'
import { Heart, MessageSquare, Share2, TrendingUp } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

// Basic card with all parts
export const Complete: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>卡片標題</CardTitle>
        <CardDescription>卡片描述文字</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          這是卡片的主要內容區域。可以放置任何內容，例如文字、圖片、表單等等。
        </p>
      </CardContent>
      <CardFooter>
        <Button>操作按鈕</Button>
      </CardFooter>
    </Card>
  ),
}

// Forum post card
export const ForumPost: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
                alt="User"
              />
              <AvatarFallback>張三</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">張三</p>
                <Badge variant="outline">新會員</Badge>
              </div>
              <p className="text-xs text-muted-foreground">2 小時前</p>
            </div>
          </div>
          <Badge>熱門</Badge>
        </div>
        <CardTitle className="mt-4">
          如何在 Next.js 中使用 Server Actions？
        </CardTitle>
        <CardDescription>技術討論 · 問答</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          我最近在學習 Next.js 14，想了解 Server Actions 的最佳實踐。
          有人可以分享一些實際的使用案例嗎？特別是在處理表單提交和資料驗證方面...
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm">
            <Heart className="mr-1 h-4 w-4" />
            42
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-1 h-4 w-4" />
            15
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            分享
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

// User profile card
export const UserProfile: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader className="items-center text-center">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop"
            alt="User"
          />
          <AvatarFallback>李四</AvatarFallback>
        </Avatar>
        <CardTitle className="mt-4">李四</CardTitle>
        <CardDescription>@lisi · 會員編號 #12345</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">128</p>
            <p className="text-xs text-muted-foreground">文章</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1.2K</p>
            <p className="text-xs text-muted-foreground">追蹤者</p>
          </div>
          <div>
            <p className="text-2xl font-bold">89</p>
            <p className="text-xs text-muted-foreground">追蹤中</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">追蹤</Button>
        <Button variant="outline" className="w-full">
          發送訊息
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Stats card
export const Stats: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">總會員數</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,345</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+20.1%</span> 較上月
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">今日文章</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">234</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12.5%</span> 較昨日
          </p>
        </CardContent>
      </Card>
    </div>
  ),
}

// Card with image
export const WithImage: Story = {
  render: () => (
    <Card className="w-[350px] overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop"
          alt="Featured"
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge>精選</Badge>
          <Badge variant="outline">技術</Badge>
        </div>
        <CardTitle>打造現代化的論壇系統</CardTitle>
        <CardDescription>使用 Next.js 14 與 Keystone 6</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          深入了解如何使用最新的技術堆疊來建構一個功能完整的論壇系統，包含身份驗證、權限管理、即時更新等功能。
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          閱讀更多
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Interactive card (hoverable)
export const Interactive: Story = {
  render: () => (
    <Card className="w-[350px] cursor-pointer transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle>可互動卡片</CardTitle>
        <CardDescription>滑鼠移入查看效果</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          這個卡片具有 hover
          效果，適合用於可點擊的內容，例如文章列表、商品展示等。
        </p>
      </CardContent>
    </Card>
  ),
}

// Minimal card
export const Minimal: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p className="text-sm">
          這是一個極簡的卡片，只有內容區域，沒有標題或頁腳。
        </p>
      </CardContent>
    </Card>
  ),
}
