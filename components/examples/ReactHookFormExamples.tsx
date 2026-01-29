'use client'

/**
 * React Hook Form 完整教學與範例
 *
 * 本檔案包含從基礎到進階的 React Hook Form 使用範例
 */

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// ============================================
// 範例 1: 基礎表單
// ============================================

const basicFormSchema = z.object({
  email: z.string().email({ message: '請輸入有效的 Email' }),
  password: z.string().min(6, '密碼至少 6 個字元'),
})

type BasicFormData = z.infer<typeof basicFormSchema>

export function BasicFormExample() {
  const [result, setResult] = useState<string>('')

  const form = useForm<BasicFormData>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: BasicFormData) {
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">範例 1: 基礎表單</h3>
        <p className="text-sm text-muted-foreground">
          最簡單的 React Hook Form 使用方式
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密碼</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">登入</Button>
        </form>
      </Form>

      {result && (
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 text-sm font-semibold">提交的資料：</p>
          <pre className="text-xs">{result}</pre>
        </div>
      )}
    </div>
  )
}

// ============================================
// 範例 2: 多種欄位類型
// ============================================

const multiFieldSchema = z.object({
  username: z
    .string()
    .min(3, '用戶名至少 3 個字元')
    .max(20, '用戶名不超過 20 個字元'),
  bio: z.string().max(200, '簡介不超過 200 個字元').optional(),
  country: z.string().min(1, '請選擇國家'),
  age: z.number().min(18, '必須年滿 18 歲').max(100, '年齡不合理'),
})

type MultiFieldData = z.infer<typeof multiFieldSchema>

export function MultiFieldExample() {
  const [result, setResult] = useState<string>('')

  const form = useForm<MultiFieldData>({
    resolver: zodResolver(multiFieldSchema),
    defaultValues: {
      username: '',
      bio: '',
      country: '',
      age: 0,
    },
  })

  function onSubmit(data: MultiFieldData) {
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">範例 2: 多種欄位類型</h3>
        <p className="text-sm text-muted-foreground">
          Input、Textarea、Select、Number 等不同欄位
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Text Input */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用戶名</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>公開顯示的用戶名稱</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Textarea */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>個人簡介</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="介紹一下你自己..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>選填，最多 200 字元</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Select Dropdown */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>國家</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇國家" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tw">台灣</SelectItem>
                    <SelectItem value="us">美國</SelectItem>
                    <SelectItem value="jp">日本</SelectItem>
                    <SelectItem value="kr">韓國</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number Input */}
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>年齡</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="18"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">提交</Button>
        </form>
      </Form>

      {result && (
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 text-sm font-semibold">提交的資料：</p>
          <pre className="text-xs">{result}</pre>
        </div>
      )}
    </div>
  )
}

// ============================================
// 範例 3: 動態欄位陣列 (useFieldArray)
// ============================================

const dynamicFieldSchema = z.object({
  title: z.string().min(1, '標題不能為空'),
  tags: z
    .array(
      z.object({
        value: z.string().min(1, '標籤不能為空'),
      })
    )
    .min(1, '至少需要一個標籤'),
})

type DynamicFieldData = z.infer<typeof dynamicFieldSchema>

export function DynamicFieldExample() {
  const [result, setResult] = useState<string>('')

  const form = useForm<DynamicFieldData>({
    resolver: zodResolver(dynamicFieldSchema),
    defaultValues: {
      title: '',
      tags: [{ value: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tags',
  })

  function onSubmit(data: DynamicFieldData) {
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">範例 3: 動態欄位陣列</h3>
        <p className="text-sm text-muted-foreground">
          使用 useFieldArray 動態新增/刪除欄位
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>文章標題</FormLabel>
                <FormControl>
                  <Input placeholder="我的文章標題" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>標籤</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: '' })}
              >
                + 新增標籤
              </Button>
            </div>

            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`tags.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder={`標籤 ${index + 1}`} {...field} />
                      </FormControl>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          刪除
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button type="submit">提交</Button>
        </form>
      </Form>

      {result && (
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 text-sm font-semibold">提交的資料：</p>
          <pre className="text-xs">{result}</pre>
        </div>
      )}
    </div>
  )
}

// ============================================
// 範例 4: 手動控制表單狀態
// ============================================

export function ManualControlExample() {
  const [result, setResult] = useState<string>('')

  const form = useForm({
    defaultValues: {
      email: '',
      acceptTerms: false,
    },
  })

  // 監聽特定欄位
  const email = form.watch('email')

  // 手動設定值
  function fillDemoData() {
    form.setValue('email', 'demo@example.com')
    form.setValue('acceptTerms', true)
  }

  // 手動觸發驗證
  async function validateEmail() {
    const isValid = await form.trigger('email')
    alert(isValid ? 'Email 格式正確' : 'Email 格式錯誤')
  }

  // 重置表單
  function resetForm() {
    form.reset()
    setResult('')
  }

  function onSubmit(data: Record<string, unknown>) {
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">範例 4: 手動控制表單</h3>
        <p className="text-sm text-muted-foreground">
          setValue、watch、trigger、reset 等進階用法
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormDescription>當前值: {email || '(空)'}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={fillDemoData}>
              填入示範資料
            </Button>
            <Button type="button" variant="outline" onClick={validateEmail}>
              驗證 Email
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>
              重置表單
            </Button>
          </div>

          <Button type="submit">提交</Button>
        </form>
      </Form>

      {result && (
        <div className="rounded-lg bg-muted p-4">
          <p className="mb-2 text-sm font-semibold">提交的資料：</p>
          <pre className="text-xs">{result}</pre>
        </div>
      )}
    </div>
  )
}
