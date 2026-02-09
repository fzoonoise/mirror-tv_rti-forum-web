import type { Meta, StoryObj } from '@storybook/react'
import { useId } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

const meta = {
  title: 'UI/Sonner',
  tags: ['autodocs'],
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
          <Button onClick={() => toast('預設訊息', { toasterId })}>
            預設
          </Button>
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
              toasterId,
              action: {
                label: '復原',
                onClick: () => toast('已復原操作', { toasterId }),
              },
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
export const Promise: Story = {
  render: () => {
    const toasterId = useId()
    const mockApiCall = (): Promise<{ name: string }> =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve({ name: '張三' })
          } else {
            reject(new Error('失敗'))
          }
        }, 2000)
      })

    return (
      <div>
        <Toaster id={toasterId} />
        <Button
          onClick={() =>
            toast.promise(
              mockApiCall(),
              {
                loading: '載入中...',
                success: (data) => `歡迎 ${data.name}！`,
                error: '載入失敗',
              },
              { toasterId }
            )
          }
        >
          Promise Toast
        </Button>
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
              toast('永久顯示（需手動關閉）', {
                duration: Infinity,
                toasterId,
              })
            }
          >
            永久
          </Button>
        </div>
      </div>
    )
  },
}

// Positioning
export const Positioning: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() =>
              toast('上左', {
                position: 'top-left',
                toasterId,
              })
            }
          >
            上左
          </Button>
          <Button
            onClick={() =>
              toast('上中', {
                position: 'top-center',
                toasterId,
              })
            }
          >
            上中
          </Button>
          <Button
            onClick={() =>
              toast('上右', {
                position: 'top-right',
                toasterId,
              })
            }
          >
            上右
          </Button>
          <Button
            onClick={() =>
              toast('下左', {
                position: 'bottom-left',
                toasterId,
              })
            }
          >
            下左
          </Button>
          <Button
            onClick={() =>
              toast('下中', {
                position: 'bottom-center',
                toasterId,
              })
            }
          >
            下中
          </Button>
          <Button
            onClick={() =>
              toast('下右', {
                position: 'bottom-right',
                toasterId,
              })
            }
          >
            下右
          </Button>
        </div>
      </div>
    )
  },
}

// Rich colors
export const RichColors: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} richColors />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            onClick={() =>
              toast.success('操作成功', {
                description: '使用 richColors 增強視覺效果',
                toasterId,
              })
            }
          >
            成功（豐富色彩）
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              toast.error('發生錯誤', {
                description: '請稍後再試',
                toasterId,
              })
            }
          >
            錯誤（豐富色彩）
          </Button>
        </div>
      </div>
    )
  },
}

// Close button
export const WithCloseButton: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} closeButton />
        <Button onClick={() => toast('這個 Toast 有關閉按鈕', { toasterId })}>
          顯示關閉按鈕
        </Button>
      </div>
    )
  },
}

// Loading state
export const Loading: Story = {
  render: () => {
    const toasterId = useId()
    return (
      <div>
        <Toaster id={toasterId} />
        <Button onClick={() => toast.loading('正在處理中...', { toasterId })}>
          載入中狀態
        </Button>
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
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">論壇常見通知：</p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  toast.success('文章已發布', {
                    description: '您的文章已成功發布到論壇',
                    toasterId,
                    action: {
                      label: '查看',
                      onClick: () => toast('導航至文章頁面', { toasterId }),
                    },
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
      </div>
    )
  },
}
