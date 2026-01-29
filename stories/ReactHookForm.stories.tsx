import type { Meta, StoryObj } from '@storybook/react'

import {
  BasicFormExample,
  DynamicFieldExample,
  ManualControlExample,
  MultiFieldExample,
} from '@/components/examples/ReactHookFormExamples'

const meta = {
  title: 'Examples/React Hook Form',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# React Hook Form 教學範例

這是一套完整的 React Hook Form 教學範例，從基礎到進階用法。

## 📚 教學文件

完整教學文件請參考：\`components/examples/REACT_HOOK_FORM_GUIDE.md\`

## 🎯 範例說明

1. **基礎表單** - 最簡單的使用方式
2. **多種欄位類型** - Input、Textarea、Select、Number
3. **動態欄位陣列** - 使用 useFieldArray 動態新增/刪除
4. **手動控制** - setValue、watch、trigger、reset

## 💡 重點提示

- 所有範例都使用 Zod 進行驗證
- 整合 shadcn/ui Form 元件
- 包含完整的 TypeScript 型別
- 提交後會顯示表單資料

試著填寫表單並觀察驗證效果！
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/**
 * ## 範例 1: 基礎表單
 *
 * 最簡單的 React Hook Form 使用方式。
 *
 * ### 重點：
 * - 使用 `useForm` hook
 * - 整合 Zod 驗證
 * - `FormField` 包裝 shadcn/ui 元件
 * - `{...field}` 自動綁定 value、onChange 等
 *
 * ### 試試看：
 * 1. 直接按「登入」看驗證錯誤
 * 2. 輸入無效的 Email (例如 "test")
 * 3. 輸入少於 6 個字元的密碼
 * 4. 填入正確資料後提交
 */
export const BasicForm: Story = {
  render: () => <BasicFormExample />,
}

/**
 * ## 範例 2: 多種欄位類型
 *
 * 展示不同類型的表單欄位：Input、Textarea、Select、Number。
 *
 * ### 重點：
 * - **Input**: 直接使用 `{...field}`
 * - **Textarea**: 同樣使用 `{...field}`
 * - **Select**: 需要 `onValueChange={field.onChange}`
 * - **Number**: 需要手動轉換 `Number(e.target.value)`
 *
 * ### 試試看：
 * 1. 用戶名輸入少於 3 個字元
 * 2. 簡介輸入超過 200 個字元
 * 3. 不選擇國家
 * 4. 年齡輸入 17（未滿 18 歲）
 */
export const MultipleFieldTypes: Story = {
  render: () => <MultiFieldExample />,
}

/**
 * ## 範例 3: 動態欄位陣列
 *
 * 使用 `useFieldArray` 實現動態新增/刪除欄位。
 *
 * ### 重點：
 * - 使用 `useFieldArray` hook
 * - `append()` 新增欄位
 * - `remove(index)` 刪除欄位
 * - 欄位名稱使用 `tags.${index}.value`
 * - 每個欄位需要唯一的 `key={field.id}`
 *
 * ### 試試看：
 * 1. 點擊「新增標籤」按鈕
 * 2. 填入多個標籤
 * 3. 刪除某個標籤
 * 4. 留空某個標籤看驗證錯誤
 * 5. 提交查看陣列資料
 *
 * ### 常見用途：
 * - 多個電話號碼
 * - 多個地址
 * - 多個社群連結
 * - 標籤系統
 */
export const DynamicFields: Story = {
  render: () => <DynamicFieldExample />,
}

/**
 * ## 範例 4: 手動控制表單
 *
 * 展示如何手動控制表單狀態。
 *
 * ### API 說明：
 *
 * **watch(name)**
 * - 監聽欄位變化（會觸發 re-render）
 * - 用於即時預覽、條件顯示等
 *
 * **setValue(name, value)**
 * - 手動設定欄位值
 * - 可選擇是否觸發驗證
 *
 * **trigger(name)**
 * - 手動觸發驗證
 * - 回傳 Promise<boolean>
 *
 * **reset(values?)**
 * - 重置表單
 * - 可選擇重置為特定值
 *
 * ### 試試看：
 * 1. 點擊「填入示範資料」
 * 2. 修改 Email 後點擊「驗證 Email」
 * 3. 觀察當前值的即時顯示
 * 4. 點擊「重置表單」
 */
export const ManualControl: Story = {
  render: () => <ManualControlExample />,
}
