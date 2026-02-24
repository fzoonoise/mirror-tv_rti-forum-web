# React Hook Form 完整教學指南

## 目錄

1. [基礎概念](#基礎概念)
2. [安裝與設定](#安裝與設定)
3. [基本用法](#基本用法)
4. [常見寫法](#常見寫法)
5. [進階技巧](#進階技巧)
6. [注意事項](#注意事項)
7. [常見問題](#常見問題)

---

## 基礎概念

### 為什麼使用 React Hook Form？

✅ **效能優異** - 減少不必要的 re-render
✅ **易於整合** - 與 Zod、Yup 等驗證庫完美整合
✅ **TypeScript 支援** - 完整的型別推斷
✅ **程式碼簡潔** - 比起 Formik 更少的樣板代碼
✅ **體積小** - 僅 ~9KB (gzipped)

### 核心概念

```
useForm() → 建立表單實例
  ├─ register() → 註冊欄位
  ├─ handleSubmit() → 處理提交
  ├─ watch() → 監聽欄位變化
  ├─ setValue() → 手動設定值
  ├─ reset() → 重置表單
  └─ formState → 表單狀態 (errors, isDirty, isValid...)
```

---

## 安裝與設定

### 1. 安裝套件

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

### 2. 基本設定

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 定義驗證 schema
const schema = z.object({
  email: z.string().email('無效的 Email'),
  password: z.string().min(6, '密碼至少 6 個字元'),
})

// 推斷 TypeScript 型別
type FormData = z.infer<typeof schema>

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 表單欄位 */}
    </form>
  )
}
```

---

## 基本用法

### 1. 簡單的表單欄位

```tsx
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
```

**重點**：

- `{...field}` 會自動綁定 `value`, `onChange`, `onBlur`, `ref`
- `FormMessage` 會自動顯示驗證錯誤訊息

### 2. Textarea 欄位

```tsx
<FormField
  control={form.control}
  name="bio"
  render={({ field }) => (
    <FormItem>
      <FormLabel>個人簡介</FormLabel>
      <FormControl>
        <Textarea {...field} />
      </FormControl>
      <FormDescription>選填，最多 200 字元</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

### 3. Select 下拉選單

```tsx
<FormField
  control={form.control}
  name="country"
  render={({ field }) => (
    <FormItem>
      <FormLabel>國家</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="選擇國家" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="tw">台灣</SelectItem>
          <SelectItem value="us">美國</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

**重點**：

- Select 需要手動綁定 `onValueChange` 和 `defaultValue`
- 不能直接用 `{...field}`

### 4. Number 數字欄位

```tsx
<FormField
  control={form.control}
  name="age"
  render={({ field }) => (
    <FormItem>
      <FormLabel>年齡</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**重點**：

- 需要將 `e.target.value` 轉換成數字
- Zod schema 使用 `z.coerce.number()` 或手動轉換

---

## 常見寫法

### 1. 監聽欄位變化 (watch)

```typescript
// 監聽單一欄位
const email = form.watch('email')

// 監聽多個欄位
const [email, password] = form.watch(['email', 'password'])

// 監聽所有欄位
const allValues = form.watch()
```

**使用場景**：

- 即時預覽
- 根據某欄位值顯示/隱藏其他欄位
- 計算總和

### 2. 手動設定值 (setValue)

```typescript
// 設定單一欄位
form.setValue('email', 'new@email.com')

// 設定多個欄位
form.setValue('email', 'new@email.com')
form.setValue('password', 'newpassword')

// 選項
form.setValue('email', 'new@email.com', {
  shouldValidate: true, // 觸發驗證
  shouldDirty: true, // 標記為已修改
  shouldTouch: true, // 標記為已觸碰
})
```

### 3. 重置表單 (reset)

```typescript
// 重置為 defaultValues
form.reset()

// 重置為新值
form.reset({
  email: 'new@email.com',
  password: '',
})

// 部分重置
form.reset({
  email: form.getValues('email'), // 保留 email
  password: '', // 清空 password
})
```

### 4. 手動觸發驗證 (trigger)

```typescript
// 驗證單一欄位
const isValid = await form.trigger('email')

// 驗證多個欄位
const isValid = await form.trigger(['email', 'password'])

// 驗證所有欄位
const isValid = await form.trigger()
```

### 5. 動態欄位陣列 (useFieldArray)

```typescript
const { fields, append, remove, move } = useFieldArray({
  control: form.control,
  name: 'tags',
})

// 新增
<Button onClick={() => append({ value: '' })}>新增</Button>

// 刪除
<Button onClick={() => remove(index)}>刪除</Button>

// 渲染
{fields.map((field, index) => (
  <FormField
    key={field.id}
    control={form.control}
    name={`tags.${index}.value`}
    render={({ field }) => <Input {...field} />}
  />
))}
```

---

## 進階技巧

### 1. 條件式驗證

```typescript
const schema = z
  .object({
    hasAddress: z.boolean(),
    address: z.string().optional(),
  })
  .refine(
    (data) => {
      // 如果勾選 hasAddress，address 必填
      if (data.hasAddress && !data.address) {
        return false
      }
      return true
    },
    {
      message: '請填寫地址',
      path: ['address'],
    }
  )
```

### 2. 自訂驗證錯誤訊息

```typescript
const schema = z.object({
  email: z.string().min(1, '請輸入 Email').email('Email 格式錯誤'),
  password: z
    .string()
    .min(6, '密碼至少 6 個字元')
    .regex(/[A-Z]/, '密碼必須包含大寫字母')
    .regex(/[0-9]/, '密碼必須包含數字'),
})
```

### 3. 非同步驗證

```typescript
const schema = z.object({
  username: z
    .string()
    .min(3)
    .refine(
      async (username) => {
        // 檢查用戶名是否已存在
        const response = await fetch(`/api/check-username?name=${username}`)
        const { exists } = await response.json()
        return !exists
      },
      {
        message: '用戶名已被使用',
      }
    ),
})
```

### 4. 表單狀態管理

```typescript
const {
  formState: {
    errors,       // 驗證錯誤
    isDirty,      // 是否有修改
    isValid,      // 是否通過驗證
    isSubmitting, // 是否提交中
    isSubmitted,  // 是否已提交
    touchedFields,// 已觸碰的欄位
    dirtyFields,  // 已修改的欄位
  }
} = form

// 使用範例
<Button type="submit" disabled={!isDirty || isSubmitting}>
  {isSubmitting ? '提交中...' : '提交'}
</Button>
```

---

## 注意事項

### ⚠️ 常見錯誤

#### 1. **忘記加 `type="button"`**

```tsx
// ❌ 錯誤 - 會觸發表單提交
<Button onClick={handleReset}>重置</Button>

// ✅ 正確
<Button type="button" onClick={handleReset}>重置</Button>
```

#### 2. **Number 欄位沒有轉換型別**

```tsx
// ❌ 錯誤 - value 會是 string
<Input type="number" {...field} />

// ✅ 正確
<Input
  type="number"
  {...field}
  onChange={(e) => field.onChange(Number(e.target.value))}
/>
```

#### 3. **Select 使用錯誤的綁定方式**

```tsx
// ❌ 錯誤 - Select 不支援 {...field}
<Select {...field}>

// ✅ 正確
<Select onValueChange={field.onChange} defaultValue={field.value}>
```

#### 4. **在 useEffect 中使用 watch**

```tsx
// ❌ 錯誤 - 可能造成無限迴圈
useEffect(() => {
  const value = form.watch('email')
  // do something
}, [form.watch('email')])

// ✅ 正確 - 使用 useWatch 或訂閱
const email = useWatch({ control: form.control, name: 'email' })

useEffect(() => {
  // do something with email
}, [email])
```

### 📌 效能優化

#### 1. **避免不必要的 re-render**

```typescript
// ❌ 避免 - 會造成整個表單 re-render
const allValues = form.watch()

// ✅ 建議 - 只監聽需要的欄位
const email = form.watch('email')
```

#### 2. **使用 useCallback 包裝 onSubmit**

```typescript
const onSubmit = useCallback((data: FormData) => {
  // 處理提交
}, [])
```

#### 3. **大型表單考慮分割**

```typescript
// 將大型表單拆分成多個子表單
<FormSection1 control={form.control} />
<FormSection2 control={form.control} />
```

### 🔒 安全性

#### 1. **永遠在後端驗證**

```typescript
// ✅ 前端驗證 (使用者體驗)
const schema = z.object({
  email: z.string().email(),
})

// ✅ 後端也要驗證 (安全性)
app.post('/api/submit', async (req, res) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    return res.status(400).json({ errors: result.error })
  }
  // 處理資料
})
```

#### 2. **敏感資料不要放在 defaultValues**

```typescript
// ❌ 避免
const form = useForm({
  defaultValues: {
    password: 'secret123', // 不要這樣做
  },
})

// ✅ 正確
const form = useForm({
  defaultValues: {
    password: '', // 永遠為空
  },
})
```

---

## 常見問題

### Q1: 如何清空表單？

```typescript
// 方法 1: 重置為 defaultValues
form.reset()

// 方法 2: 重置為空值
form.reset({
  email: '',
  password: '',
})
```

### Q2: 如何取得某個欄位的值？

```typescript
// 方法 1: watch (會觸發 re-render)
const email = form.watch('email')

// 方法 2: getValues (不會觸發 re-render)
const email = form.getValues('email')
```

### Q3: 如何設定欄位為必填？

```typescript
// 使用 Zod
const schema = z.object({
  email: z.string().min(1, 'Email 為必填'),
  // 或
  email: z.string({ required_error: 'Email 為必填' }),
})
```

### Q4: 如何在提交前做額外處理？

```typescript
const onSubmit = async (data: FormData) => {
  // 提交前處理
  const processedData = {
    ...data,
    email: data.email.toLowerCase(),
  }

  // 發送 API
  await fetch('/api/submit', {
    method: 'POST',
    body: JSON.stringify(processedData),
  })
}
```

### Q5: 如何處理 API 錯誤並顯示在表單上？

```typescript
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const { errors } = await response.json()

      // 設定欄位錯誤
      Object.keys(errors).forEach((key) => {
        form.setError(key as any, {
          message: errors[key],
        })
      })
    }
  } catch (error) {
    // 設定通用錯誤
    form.setError('root', {
      message: '提交失敗，請稍後再試',
    })
  }
}

// 顯示通用錯誤
{form.formState.errors.root && (
  <div className="text-destructive">
    {form.formState.errors.root.message}
  </div>
)}
```

---

## 完整範例

查看 `ReactHookFormExamples.tsx` 檔案，包含：

1. ✅ 基礎表單
2. ✅ 多種欄位類型
3. ✅ 動態欄位陣列 (useFieldArray)
4. ✅ 手動控制表單狀態

在 Storybook 中查看實際效果：

```bash
pnpm storybook
```

導覽至 **Examples > React Hook Form**

---

## 參考資源

- 📖 [React Hook Form 官方文檔](https://react-hook-form.com/)
- 📖 [Zod 官方文檔](https://zod.dev/)
- 📖 [shadcn/ui Form 文檔](https://ui.shadcn.com/docs/components/form)
