import type { Meta, StoryObj } from '@storybook/react'
import { useId } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

const meta = {
  title: 'UI/Sonner',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast notifications powered by Sonner. **Note**: In production, a single global `<Toaster />` is placed in the app layout. In Storybook, each story uses an isolated `<Toaster />` with a unique ID to prevent toast messages from appearing across multiple stories simultaneously when viewing documentation.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// Basic toast
export const Default: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <Button onClick={() => toast('活動已建立', { toasterId })}>
          顯示 Toast
        </Button>
      </div>
    )
  },
}

// Toast with description
export const WithDescription: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <Button
          onClick={() =>
            toast('活動已建立', {
              description: '您的活動將於明天下午 2:00 開始',
              toasterId,
            })
          }
        >
          帶描述的 Toast
        </Button>
      </div>
    )
  },
}

// Toast types
export const Types: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => toast('預設訊息', { toasterId })}>預設</Button>
          <Button onClick={() => toast.success('操作成功！', { toasterId })}>
            成功
          </Button>
          <Button onClick={() => toast.error('發生錯誤', { toasterId })}>
            錯誤
          </Button>
          <Button onClick={() => toast.info('這是一則訊息', { toasterId })}>
            訊息
          </Button>
          <Button onClick={() => toast.warning('請注意', { toasterId })}>
            警告
          </Button>
        </div>
      </div>
    )
  },
}

// Toast with action
export const WithAction: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <Button
          onClick={() =>
            toast('活動已建立', {
              action: {
                label: '復原',
                onClick: () => toast('已復原操作', { toasterId }),
              },
              toasterId,
            })
          }
        >
          帶操作按鈕的 Toast
        </Button>
      </div>
    )
  },
}

// Promise toast
// Note: toast.promise does not support toasterId parameter
export const PromiseToast: Story = {
  render: () => {
    const mockApiCall = (): Promise<{ name: string }> =>
      new Promise<{ name: string }>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve({ name: '張三' })
          } else {
            reject(new Error('失敗'))
          }
        }, 2000)
      })

    const handleClick = () => {
      const promise = mockApiCall()
      toast.promise(promise, {
        loading: '載入中...',
        success: (data) => `歡迎 ${data.name}！`,
        error: '載入失敗',
      })
    }

    return (
      <div>
        <Toaster />
        <Button onClick={handleClick}>Promise Toast</Button>
      </div>
    )
  },
}

// Custom duration
export const CustomDuration: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => toast('1 秒後消失', { duration: 1000, toasterId })}
          >
            1 秒
          </Button>
          <Button
            onClick={() => toast('5 秒後消失', { duration: 5000, toasterId })}
          >
            5 秒
          </Button>
          <Button
            onClick={() =>
              toast('永久顯示（需手動關閉）', { duration: Infinity, toasterId })
            }
          >
            永久
          </Button>
        </div>
      </div>
    )
  },
}

// Forum use cases
export const ForumUseCases: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <div className="space-y-2">
          <p className="text-sm font-medium">論壇常見通知：</p>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast.success('文章已發布', {
                  description: '您的文章已成功發布到論壇',
                  action: {
                    label: '查看',
                    onClick: () => toast('導航至文章頁面', { toasterId }),
                  },
                  toasterId,
                })
              }
            >
              發布文章
            </Button>
            <Button
              onClick={() =>
                toast.success('已收藏文章', {
                  description: '已新增至您的收藏清單',
                  toasterId,
                })
              }
            >
              收藏文章
            </Button>
            <Button
              onClick={() =>
                toast('已複製連結', {
                  description: '文章連結已複製到剪貼簿',
                  toasterId,
                })
              }
            >
              複製連結
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast.error('權限不足', {
                  description: '您沒有權限執行此操作',
                  toasterId,
                })
              }
            >
              權限錯誤
            </Button>
          </div>
        </div>
      </div>
    )
  },
}
