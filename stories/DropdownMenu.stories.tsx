import type { Meta, StoryObj } from '@storybook/react'
import {
  Bell,
  BookmarkPlus,
  Eye,
  EyeOff,
  Flag,
  LogOut,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  Settings,
  Share2,
  Trash2,
  User,
} from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

// Basic dropdown menu
export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">開啟選單</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>選項 1</DropdownMenuItem>
        <DropdownMenuItem>選項 2</DropdownMenuItem>
        <DropdownMenuItem>選項 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// User menu (forum header)
export const UserMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop"
              alt="User"
            />
            <AvatarFallback>張三</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">張三</p>
            <p className="text-xs leading-none text-muted-foreground">
              zhang@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            個人資料
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquare />
            我的文章
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookmarkPlus />
            已收藏
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            通知設定
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings />
          設定
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <LogOut />
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Post action menu
export const PostActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil />
          編輯文章
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 />
          分享
        </DropdownMenuItem>
        <DropdownMenuItem>
          <BookmarkPlus />
          收藏
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Flag />
          檢舉
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 />
          刪除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// With checkboxes
export const WithCheckboxes: Story = {
  render: () => {
    const [showReplies, setShowReplies] = useState(true)
    const [showImages, setShowImages] = useState(false)
    const [showVideos, setShowVideos] = useState(false)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">檢視選項</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>顯示內容</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showReplies}
            onCheckedChange={setShowReplies}
          >
            顯示回覆
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showImages}
            onCheckedChange={setShowImages}
          >
            顯示圖片
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showVideos}
            onCheckedChange={setShowVideos}
          >
            顯示影片
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// With radio group
export const WithRadioGroup: Story = {
  render: () => {
    const [sortBy, setSortBy] = useState('latest')

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">排序方式</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>排序依據</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="latest">最新</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">熱門</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="mostReplies">
              最多回覆
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">最舊</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// With sub-menu
export const WithSubMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">更多操作</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Mail />
          發送訊息
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Eye />
            隱私設定
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Eye />
              公開
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User />
              僅好友
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EyeOff />
              僅自己
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share2 />
            分享至
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Facebook</DropdownMenuItem>
            <DropdownMenuItem>Twitter</DropdownMenuItem>
            <DropdownMenuItem>Line</DropdownMenuItem>
            <DropdownMenuItem>複製連結</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings />
          設定
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// With keyboard shortcuts
export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">快捷鍵</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>編輯器快捷鍵</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          儲存
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          復原
          <DropdownMenuShortcut>⌘Z</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          重做
          <DropdownMenuShortcut>⇧⌘Z</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          搜尋
          <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          取代
          <DropdownMenuShortcut>⌘H</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

// Disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">操作選單</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>可用選項</DropdownMenuItem>
        <DropdownMenuItem disabled>已停用選項</DropdownMenuItem>
        <DropdownMenuItem>另一個可用選項</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
