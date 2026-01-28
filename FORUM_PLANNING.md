# RTI Forum 論壇網站規劃文件

## 專案概述

本文件記錄 RTI Forum 論壇前端網站的技術架構與開發規範。

**專案定位**: 純前端 Next.js 專案，透過 GraphQL 與後端 Keystone 6 API 通訊。

### 環境需求

- **Node.js**: v22.20.0 (Next.js 16 要求最低 20.9.0)
- **TypeScript**: 5.1.0+
- **套件管理器**: pnpm

### 後端整合

- 後端使用 **Keystone 6** (基於 GraphQL)
- 後端使用 **Apollo Server** 提供 GraphQL API
- 認證採用 **Firebase Authentication**
- 前端透過 **Apollo Client** 與後端 API 通訊
- 前端專案不包含後端代碼

---

## 核心技術棧

| 類別           | 技術                                      | 說明                                        |
| -------------- | ----------------------------------------- | ------------------------------------------- |
| 前端框架       | Next.js 16.1.5                            | App Router、最低 Node.js 20.9.0、安全更新版 |
| 套件管理器     | pnpm                                      | 快速、節省磁碟空間的套件管理器              |
| UI 框架        | Tailwind CSS v3.4 + shadcn/ui             | 現代化元件庫                                |
| 程式碼格式化   | Prettier + prettier-plugin-tailwindcss    | 自動排序 Tailwind classes                   |
| Linting        | ESLint + eslint-plugin-simple-import-sort | 自動排序 imports/exports                    |
| 狀態管理       | Zustand                                   | 輕量級狀態管理                              |
| GraphQL Client | Apollo Client                             | 連接 Keystone 6 API                         |
| 表單驗證       | Zod + React Hook Form                     | 型別安全的表單驗證                          |
| 認證           | Firebase Auth                             | 前端 Firebase SDK + 後端 Session            |
| 多語系         | next-intl                                 | Next.js App Router 原生支援                 |
| 內容編輯       | Markdown                                  | react-md-editor + 工具列                    |
| 後端           | Keystone 6 + Apollo Server                | 現有架構                                    |
| 資料庫         | PostgreSQL                                | 透過 Keystone 6 管理                        |
| ORM            | Keystone 6 (內建 Prisma)                  | 不需額外 ORM                                |
| 內容翻譯       | Gemini API                                | 後端負責文章翻譯                            |
| UI 開發        | Storybook                                 | 元件開發與展示                              |
| 部署平台       | Google Cloud Platform                     | 使用 Cloud Build 部署                       |
| 監控           | Google Cloud Logging                      | GCP 內建日誌系統                            |

---

## 認證與授權

### 雙軌權限系統

- **Admin UI 登入**: Keystone User (後台管理)
- **前端會員登入**: Member (透過 Firebase + GraphQL)

### Firebase 認證流程

1. 前端使用 Firebase Client SDK 登入取得 `idToken`
2. 呼叫後端 GraphQL mutation `authenticateMemberWithFirebase`
3. 後端驗證 Firebase Token 並回傳 Session Token
4. 前端儲存 Session Token (localStorage/cookie)
5. 後續請求帶 `Authorization: Bearer <sessionToken>` Header

### GraphQL 認證 API

- **Mutation**: `authenticateMemberWithFirebase` - Firebase 登入
- **Query**: `authenticatedMember` - 取得當前登入會員

### 登入方式

- Email + Password (透過 Firebase)
- 其他方式需確認 Firebase 專案配置

---

## 核心功能

### 基礎功能

- 用戶註冊/登入
- 用戶個人資料頁面
- 發布主題文章
  - 支援文字格式：粗體、斜體、刪除線、H2 標題
  - 支援附加：圖片、影片、連結
  - 支援投票功能
- 回覆/留言功能
- 編輯/刪除自己的內容
- 瀏覽論壇分類
  - CMS 設定 1-30 個主題
  - 顯示在前端瀑布流旁邊
  - 用戶發布時可選取
  - 支援 post type 分類（如 poll=true）
- 搜尋功能

### 互動功能

- 按讚/點贊
- 收藏/書籤
- 舉報/檢舉
  - 用戶可檢舉其他用戶
  - 可選取或填寫檢舉原因
  - 資料灌進 CMS 該則 post 的檢舉欄位
  - 通知 CMS 管理者查看

### 內容功能

- Markdown 支援
  - 粗體、斜體、刪除線
  - H2 標題
- 圖片上傳
- 影片上傳
- 檔案附件
- 嵌入影片/連結預覽
- 投票功能
  - 用戶須登入才能投票
  - 可新增投票選項

### 管理功能 (CMS)

- 管理員後台
- 用戶管理
  - 隱藏特定用戶所有文章
  - 隱藏特定用戶特定文章
  - 不刪除用戶文章，僅隱藏
- 論壇分類管理
- 置頂/精華文章
  - 可置頂 List editor choices 內文章
  - 包含一般文章（多附加央廣新聞 link 和圖片）
  - 包含投票 poll
- 日誌記錄
- 統計顯示
  - reaction 數
  - comment 數

### 其他進階功能

- SEO 優化
- 多語言支援（五國語言）
  - UI 介面多語系：繁中、英文、印尼文、越南文、泰文
  - 文章內容翻譯（後端使用 Gemini API）

### 不實作功能 (Phase 1)

- 關注用戶
- 通知系統
- 私訊功能
- 標籤 (Tags) 系統（使用分類代替）
- 即時聊天
- 遊戲化（積分/徽章/等級）
- 暗黑模式
- PWA 支援
- RSS Feed
- CMS 統計分析（僅顯示基本數據）

---

## 資料模型

**注意**: 資料模型由後端 Keystone 6 定義，此處僅列出前端需要的核心欄位概念，實際結構需與後端對齊。

### 核心實體

- **Member**: 會員資料（Firebase 認證 + 個人資料）
- **Post**: 文章（支援 Markdown、附件、投票）
- **Reply**: 回覆/留言
- **Category**: 論壇分類（1-30 個主題）
- **Vote**: 投票（需登入）
- **Report**: 檢舉記錄

詳細欄位定義待與後端 GraphQL Schema 對齊後確認。

---

## 檔案上傳與儲存

### 檔案規格

- **單檔大小上限**: 5 MB
- **允許檔案類型**: jpg, png
- **壓縮策略**: 保持原檔

### 儲存方案 (待確認)

待選擇：AWS S3、Cloudinary、Vercel Blob、Supabase Storage 或其他

---

## 效能與最佳化

### 快取策略 (分層架構)

| 層級 | 方案                | 用途         | 說明                            |
| ---- | ------------------- | ------------ | ------------------------------- |
| L1   | Next.js 內建快取    | 頁面/組件級  | App Router 自動快取靜態內容     |
| L2   | Apollo Client Cache | GraphQL 查詢 | 前端記憶體快取，減少重複請求    |
| L3   | Redis               | 熱門資料     | 快取熱門文章、分類列表等 (後端) |
| L4   | CDN                 | 靜態資源     | 圖片、CSS、JS 等靜態檔案        |

**論壇特性**: 讀多寫少，快取效益高

### 快取策略說明

#### L1: Next.js 內建快取

- **用途**: 頁面和組件級別的快取
- **機制**: App Router 自動快取靜態內容和 React Server Components
- **適用場景**:
  - 靜態頁面 (首頁、關於頁面)
  - 不常變動的分類列表
  - 使用 ISR 的文章列表

#### L2: Apollo Client Cache

- **用途**: GraphQL 查詢結果快取
- **機制**: 前端記憶體快取，自動管理查詢結果
- **適用場景**:
  - 重複查詢的會員資料
  - 已讀取過的文章內容
  - 分類和標籤資料
- **優勢**: 減少重複的 GraphQL 請求，提升用戶體驗

#### L3: Redis (後端)

- **用途**: 伺服器端熱門資料快取
- **機制**: 在 Keystone 6 後端整合 Redis
- **適用場景**:
  - 熱門文章列表 (TTL: 5-10 分鐘)
  - 分類與子分類結構 (TTL: 30 分鐘)
  - 會員統計資料 (TTL: 5 分鐘)
- **優勢**: 減輕資料庫負擔，提升 API 回應速度
- **部署**: 建議使用 GCP Memorystore for Redis

#### L4: CDN

- **用途**: 靜態資源分發
- **機制**: 邊緣節點快取靜態檔案
- **適用場景**:
  - 圖片資源 (會員頭像、文章圖片)
  - JavaScript/CSS bundle
  - 公開的靜態檔案
- **建議**: 使用 GCP Cloud CDN 或 Cloudflare

### 渲染策略

採用混合策略：

- **SSG**: 靜態頁面 (首頁、關於頁面)
- **SSR**: 動態內容 (文章頁、個人資料)
- **ISR**: 定期更新的內容 (分類列表、熱門文章)
- **CSR**: 即時互動 (按讚、留言)

---

## 部署與維運

### 部署平台

- **平台**: Google Cloud Platform
- **CI/CD**: Google Cloud Build
- **配置檔**: `cloudbuild.yaml`

### Google Cloud Build 說明

Cloud Build 是 GCP 的 CI/CD 服務：

- 與 GCP 深度整合，可自動部署至 Cloud Run、GKE、App Engine 等
- 使用 `cloudbuild.yaml` 定義建置與部署流程
- 支援從 GitHub、GitLab 等代碼倉庫自動觸發
- 提供免費額度 (每日前 120 分鐘免費)

**基本 cloudbuild.yaml 範例**:

```yaml
steps:
  # 安裝依賴
  - name: 'node:22'
    entrypoint: npm
    args: ['ci']

  # 建置
  - name: 'node:22'
    entrypoint: npm
    args: ['run', 'build']

  # 部署 (視目標平台調整)
  - name: 'gcr.io/cloud-builders/gcloud'
    args: ['app', 'deploy']
```

### 監控與日誌

#### Google Cloud Logging

- **說明**: GCP 內建的日誌管理系統
- **功能**:
  - 自動收集應用日誌
  - 支援日誌搜尋和過濾
  - 可設定日誌匯出至 BigQuery 做分析
  - 與其他 GCP 服務深度整合
- **免費額度**: 每月前 50 GB 免費
- **適用場景**: 初期開發和中小型應用

#### 錯誤追蹤 (可選)

初期使用 Cloud Logging 已足夠，後續流量增加可考慮：

- **Sentry**: 專業的錯誤追蹤服務 (免費版每月 5000 錯誤)
- **優勢**: 更豐富的錯誤上下文、Source Maps 支援、效能監控

---

## 開發規範

### 程式碼風格

- **Linting**: ESLint + Prettier
- **配置**: 使用 Next.js 推薦設定

### TypeScript

- **模式**: Strict Mode
- **版本**: 5.1.0+

### 測試策略

初期不導入自動化測試，專注於功能開發

### UI 開發工具

- **Storybook**
  - 用於展示和測試基本 UI 元件
  - 獨立於主應用的元件開發環境
  - 可用於設計系統文檔

### Git 工作流程

- **策略**: GitHub Flow
- **分支命名**: `feature/*`, `bugfix/*`, `hotfix/*`
- **主要分支**: `main` (生產), `dev` (開發)

---

## 技術整合說明

### 套件管理器

使用 **pnpm** 作為專案套件管理器

**安裝 pnpm**:

```bash
npm install -g pnpm
```

**基本指令**:

```bash
pnpm install              # 安裝依賴
pnpm add <package>        # 新增依賴
pnpm add -D <package>     # 新增開發依賴
pnpm remove <package>     # 移除依賴
pnpm run <script>         # 執行腳本
```

### 核心依賴套件

```json
{
  "packageManager": "pnpm@9.15.2",
  "dependencies": {
    "next": "^16.1.5",
    "react": "^19.x",
    "react-dom": "^19.x",
    "@apollo/client": "^3.x",
    "graphql": "^16.x",
    "firebase": "^10.x",
    "zustand": "^4.x",
    "zod": "^3.x",
    "react-hook-form": "^7.x",
    "@hookform/resolvers": "^3.x",
    "next-intl": "^3.x",
    "react-markdown": "^9.x",
    "@uiw/react-md-editor": "^4.x",
    "remark-gfm": "^4.x"
  },
  "devDependencies": {
    "@storybook/react": "^8.x",
    "@storybook/nextjs": "^8.x",
    "tailwindcss": "^3.4",
    "typescript": "^5.1.0",
    "eslint": "^9.x",
    "eslint-plugin-simple-import-sort": "^12.x",
    "prettier": "^3.x",
    "prettier-plugin-tailwindcss": "^0.6.x"
  }
}
```

### Zod 使用說明

#### 為什麼使用 Zod

- **表單驗證**: 與 React Hook Form + shadcn/ui Form 元件完美整合
- **型別安全**: 自動生成 TypeScript 型別
- **環境變數驗證**: 應用啟動時驗證環境變數格式
- **API 資料驗證**: Runtime 驗證 GraphQL 回應格式

#### 使用範例

**表單驗證**:

```typescript
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
  email: z.string().email('請輸入有效的 Email'),
  password: z.string().min(6, '密碼至少 6 個字元'),
})

type LoginForm = z.infer<typeof loginSchema>

function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  // ... 表單實作
}
```

**環境變數驗證**:

```typescript
import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
})
```

---

### 自動格式化與排序

#### Tailwind CSS Class 排序

使用 **prettier-plugin-tailwindcss** 自動排序 Tailwind classes。

**配置 (.prettierrc)**:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2,
  "bracketSpacing": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**運作方式**:

- 儲存時自動排序 Tailwind classes
- 按照官方推薦的 class 順序排列
- 範例: `className="text-white bg-blue-500 p-4"` → `className="bg-blue-500 p-4 text-white"`

#### Import/Export 排序

使用 **eslint-plugin-simple-import-sort** 自動排序 imports 和 exports。

**配置 (.eslintrc.json)**:

```json
{
  "extends": ["next/core-web-vitals"],
  "plugins": ["simple-import-sort"],
  "rules": {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  }
}
```

**排序規則**（自動）:

1. React 相關 imports (react, react-dom)
2. Node.js 內建模組 (fs, path)
3. 外部套件 (@apollo/client, firebase)
4. 內部模組 (@/lib, @/components)
5. 相對路徑 (./utils, ../config)
6. 樣式檔案 (.css, .scss)

**範例**:

```typescript
// 儲存前
import { useState } from 'react'
import './styles.css'
import { ApolloClient } from '@apollo/client'
import { Button } from '@/components/ui/button'

// 儲存後（自動排序）
import { useState } from 'react'

import { ApolloClient } from '@apollo/client'

import { Button } from '@/components/ui/button'

import './styles.css'
```

#### VSCode 設定

建立 `.vscode/settings.json` 確保團隊一致的格式化設定：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

**搭配 VSCode 擴充套件**:

- Prettier - Code formatter (esbenp.prettier-vscode)
- ESLint (dbaeumer.vscode-eslint)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

#### 設定原理

1. **Prettier**: 負責程式碼格式化（縮排、引號、分號等）
2. **prettier-plugin-tailwindcss**: Prettier 插件，排序 Tailwind classes
3. **ESLint**: 負責程式碼品質檢查
4. **eslint-plugin-simple-import-sort**: ESLint 插件，排序 imports
5. **VSCode**: 儲存時自動執行 Prettier 和 ESLint

**執行順序**:

```
儲存檔案
→ Prettier 格式化（含 Tailwind class 排序）
→ ESLint 修正（含 import 排序）
→ 完成
```

**不會衝突的原因**:

- Prettier 處理格式（空格、換行）
- ESLint 處理結構（import 順序、程式邏輯）
- Tailwind CSS v3 與這些工具完全相容

---

### 多語系實作 (next-intl)

#### 為什麼選擇 next-intl 而非 i18next

**next-intl 優勢**:

- ✅ 專為 Next.js App Router 設計
- ✅ 原生支援 React Server Components
- ✅ 類型安全更好（自動 TypeScript 推斷）
- ✅ 配置簡單，學習曲線低
- ✅ 與 Next.js 16 middleware 完美整合
- ✅ 支援 Server Actions

**i18next 劣勢**:

- ❌ 為通用 React 設計，非 Next.js 專用
- ❌ App Router 整合需要額外配置
- ❌ 類型安全需手動定義
- ❌ 配置複雜，樣板代碼多

#### 架構設計

**雙層翻譯系統**:

1. **UI 介面翻譯** (next-intl): 按鈕、標籤、提示訊息
2. **內容翻譯** (Gemini API): 用戶發布的文章、回覆

#### next-intl 配置範例

**1. 設定語言檔**

```typescript
// messages/zh-TW.json
{
  "common": {
    "login": "登入",
    "logout": "登出",
    "search": "搜尋",
    "post": "發布文章"
  },
  "post": {
    "create": "發布文章",
    "edit": "編輯文章",
    "delete": "刪除文章"
  }
}

// messages/en.json
{
  "common": {
    "login": "Login",
    "logout": "Logout",
    "search": "Search",
    "post": "Post Article"
  }
}
```

**2. 配置 next-intl**

```typescript
// i18n.ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}))
```

**3. 使用翻譯**

```typescript
// Client Component
import {useTranslations} from 'next-intl'

function Header() {
  const t = useTranslations('common')
  return <button>{t('login')}</button>
}

// Server Component
import {getTranslations} from 'next-intl/server'

async function Page() {
  const t = await getTranslations('post')
  return <h1>{t('create')}</h1>
}
```

**4. 支援語言**
支援五國語言：

- 繁體中文 (zh-TW)
- 英文 (en)
- 印尼文 (id)
- 越南文 (vi)
- 泰文 (th)

#### 內容翻譯 (Gemini API)

**流程**:

1. 用戶發布文章（原始語言）
2. 後端偵測原始語言
3. 後端呼叫 Gemini API 翻譯成其他三種語言
4. 儲存翻譯結果至資料庫
5. 前端根據用戶語言偏好顯示對應翻譯

**GraphQL Schema 建議** (待後端確認):

```graphql
type Post {
  id: ID!
  originalLanguage: String!
  translations: [PostTranslation!]!
}

type PostTranslation {
  language: String!
  title: String!
  content: String!
  isAITranslated: Boolean!
}
```

**前端查詢範例**:

```typescript
const GET_POST = gql`
  query GetPost($id: ID!, $language: String!) {
    post(id: $id) {
      id
      originalLanguage
      translation(language: $language) {
        title
        content
        isAITranslated
      }
    }
  }
`
```

---

### Markdown 編輯器

#### 選擇方案: react-md-editor

**特點**:

- Markdown 語法 + 視覺化工具列
- 支援即時預覽
- 支援程式碼高亮
- 輕量級，易於整合

#### 實作範例

**編輯器組件**:

```typescript
import MDEditor from '@uiw/react-md-editor'

function PostEditor() {
  const [content, setContent] = useState('')

  return (
    <MDEditor
      value={content}
      onChange={(val) => setContent(val || '')}
      preview="edit"
      height={400}
    />
  )
}
```

**顯示 Markdown 內容**:

```typescript
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

function PostContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
```

**支援的 Markdown 功能**:

- 粗體: `**text**`
- 斜體: `*text*`
- 刪除線: `~~text~~`
- H2 標題: `## Heading`
- 程式碼區塊: ` ```language ... ``` `
- 連結: `[text](url)`
- 圖片: `![alt](url)`
- 清單: `- item` 或 `1. item`

**圖片/影片上傳整合**:
待與檔案上傳方案確定後實作，將上傳後的 URL 插入 Markdown。

### Apollo Client 配置

```typescript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
    'http://localhost:3000/api/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('sessionToken')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
```

### 環境變數需求

**前端 (.env)**

建立 `.env` 檔案（本地開發使用）：

```bash
# GraphQL API
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql

# Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# 多語系（可選，預設從瀏覽器偵測）
NEXT_PUBLIC_DEFAULT_LOCALE=zh-TW
```

建立 `.env.example` 檔案（提交到 Git，供團隊參考）：

```bash
# GraphQL API
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql

# Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# 多語系（可選，預設從瀏覽器偵測）
NEXT_PUBLIC_DEFAULT_LOCALE=zh-TW
```

**.gitignore 設定**:

- node_modules

```
# 環境變數
.env*

# cursor
.cursor

# gemini
.gemini/
GEMINI.md

# CLAUDE
.claude
CLAUDE.md
```

**後端 (參考 forum-cms README.md)**

```bash
# Firebase Authentication
FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_JSON=
# 或
FIREBASE_SERVICE_ACCOUNT_BASE64=

# Session
MEMBER_SESSION_SECRET=
MEMBER_SESSION_MAX_AGE=86400  # 秒

# Gemini API (內容翻譯)
GEMINI_API_KEY=
GEMINI_MODEL=gemini-pro  # 或其他模型

# 支援語言清單
SUPPORTED_LANGUAGES=zh-TW,en,id,vi,th
```

### 專案架構

```
rti-forum/
├── app/                        # Next.js App Router
│   ├── [locale]/               # 多語言路由
│   │   ├── (auth)/             # 認證相關頁面
│   │   │   ├── login/          # 登入頁面
│   │   │   └── register/       # 註冊頁面
│   │   ├── (forum)/            # 論壇主要頁面
│   │   │   ├── page.tsx        # 首頁
│   │   │   ├── posts/          # 文章相關
│   │   │   ├── profile/        # 個人資料
│   │   │   └── search/         # 搜尋頁面
│   │   └── layout.tsx          # 語言佈局
│   └── api/                    # API Routes (如需要)
├── components/                 # React 元件
│   ├── ui/                     # shadcn/ui 元件
│   ├── forms/                  # 表單元件
│   ├── markdown/               # Markdown 編輯器/顯示元件
│   └── layouts/                # 佈局元件
├── lib/                        # 工具函數
│   ├── apollo.ts               # Apollo Client 配置
│   ├── firebase.ts             # Firebase 配置
│   ├── env.ts                  # 環境變數驗證 (Zod)
│   └── utils.ts                # 通用工具
├── hooks/                      # Custom Hooks
│   ├── useAuth.ts              # 認證 Hook
│   └── useLocale.ts            # 語言切換 Hook
├── stores/                     # Zustand Stores
│   └── authStore.ts            # 認證狀態
├── types/                      # TypeScript 型別定義
│   ├── graphql.ts              # GraphQL 型別
│   └── i18n.ts                 # 多語系型別
├── graphql/                    # GraphQL 查詢/Mutation
│   ├── queries/                # 查詢
│   ├── mutations/              # 變更
│   └── fragments/              # 片段
├── messages/                   # 多語系翻譯檔
│   ├── zh-TW.json              # 繁體中文
│   ├── en.json                 # 英文
│   ├── id.json                 # 印尼文
│   ├── vi.json                 # 越南文
│   └── th.json                 # 泰文
├── .storybook/                 # Storybook 配置
├── stories/                    # Storybook Stories
├── public/                     # 靜態檔案
├── .vscode/                    # VSCode 設定
│   └── settings.json           # 編輯器設定
├── .env                        # 環境變數（加入 .gitignore）
├── .env.example                # 環境變數範例
├── .gitignore                  # Git 忽略檔案
├── .prettierrc                 # Prettier 配置
├── .eslintrc.json              # ESLint 配置
├── tailwind.config.ts          # Tailwind CSS 配置
├── tsconfig.json               # TypeScript 配置
├── next.config.ts              # Next.js 配置
├── i18n.ts                     # next-intl 配置
├── middleware.ts               # 語言偵測 middleware
├── package.json                # 專案依賴
├── pnpm-lock.yaml              # pnpm 鎖定檔
├── cloudbuild.yaml             # Cloud Build 配置
└── README.md                   # 專案說明
```

## 待確認事項

### 高優先級（需與後端對齊）

1. **GraphQL Schema 確認** - 與後端對齊資料模型（Member、Post、Category、Vote、Report 等）
2. **圖片/影片儲存方案** - 選擇 AWS S3、Cloudinary、GCS 或其他服務
3. **內容翻譯 API 整合** - 確認 Gemini API 呼叫方式與 GraphQL 查詢結構（繁中、英、印尼、越南、泰文）

### 中優先級

5. **分類結構** - 確認論壇 1-30 個分類的命名與層級
6. **權限角色細節** - 確認 Admin、Moderator、User 的具體權限範圍
7. **檢舉機制** - 確認檢舉流程與 CMS 通知方式
8. **投票功能規格** - 確認投票選項數量、修改規則等

### 低優先級

9. **Redis 部署** - 確認使用 GCP Memorystore 或其他 Redis 服務
10. **CDN 服務** - 確認使用 GCP CDN 或 Cloudflare
11. **備份策略** - 制定資料庫備份計劃
12. **SEO 策略** - 確認多語言 SEO 需求（hreflang、sitemap 等）

---

## 下一步行動

### Phase 1: 專案初始化

1. ✅ 完成技術規劃文件
2. ⏳ 使用 pnpm 建立 Next.js 16.1.5 專案
   - `pnpm create next-app@latest`
   - 選擇 TypeScript、ESLint、App Router
3. ⏳ 設定專案架構
   - 建立 `components/`, `lib/`, `hooks/`, `stores/`, `types/`, `graphql/`, `messages/` 目錄
   - 確認 `.env` 已加入 `.gitignore`
4. ⏳ 配置 Prettier + prettier-plugin-tailwindcss
   - 建立 `.prettierrc` 配置檔
   - 安裝 `prettier-plugin-tailwindcss`
5. ⏳ 配置 ESLint + eslint-plugin-simple-import-sort
   - 更新 `.eslintrc.json`
   - 安裝 `eslint-plugin-simple-import-sort`
6. ⏳ 建立 .vscode/settings.json（團隊編輯器設定）
7. ⏳ 配置 Tailwind CSS v3.4 + shadcn/ui
   - 安裝 Tailwind CSS v3.4
   - 初始化 shadcn/ui
8. ⏳ 配置 next-intl 多語系
   - 建立五國語言翻譯檔（繁中、英、印尼、越南、泰文）
   - 設定 `i18n.ts` 和 `middleware.ts`
9. ⏳ 整合 Storybook

### Phase 2: 核心整合

10. ⏳ 建立 Apollo Client 連接
    - 建立 `lib/apollo.ts`
    - 配置認證 Header
11. ⏳ 實作 Firebase 認證流程
    - 建立 `lib/firebase.ts`
    - 實作 `hooks/useAuth.ts`
    - 建立 `stores/authStore.ts`
12. ⏳ 與後端對齊 GraphQL Schema
    - 定義 `types/graphql.ts`
    - 建立基礎 queries 和 mutations
13. ⏳ 實作 Markdown 編輯器元件
    - 建立 `components/markdown/` 元件
14. ⏳ 建立基礎 UI 元件庫
    - 使用 shadcn/ui 安裝基礎元件
    - 建立 Storybook stories

### Phase 3: 功能開發（待後端 Schema 確認後）

15. ⏳ 實作用戶註冊/登入頁面
    - `app/[locale]/(auth)/login/page.tsx`
    - `app/[locale]/(auth)/register/page.tsx`
16. ⏳ 實作文章發布功能
    - 支援 Markdown 編輯
    - 圖片上傳
    - 投票功能
17. ⏳ 實作文章列表與瀑布流
    - `app/[locale]/(forum)/page.tsx`
    - `app/[locale]/(forum)/posts/page.tsx`
18. ⏳ 實作回覆/留言功能
    - 文章詳情頁
    - 回覆元件
19. ⏳ 實作搜尋功能
    - `app/[locale]/(forum)/search/page.tsx`
20. ⏳ 實作互動功能
    - 按讚/點贊
    - 收藏/書籤
    - 檢舉/舉報

### 待確認後進行

- 圖片/影片上傳整合
- Gemini 翻譯內容顯示
- SEO 優化
- 效能優化與快取策略

### 準備開始建立專案

**⚠️ IMPORTANT - 重要規範**:
**All commands, code comments, commit messages, and implementation notes MUST be written in English only when building and setting up this project based on this planning document.**

**當前狀態**: ✅ 技術規劃完成，準備建立 Next.js 專案

**規劃完成日期**: 2026-01-27

**專案架構說明**:

- 純前端 Next.js 16.1.5 專案
- 不使用 `src/` 目錄層級
- 環境變數使用 `.env` 檔案（非 `.env.local`）
- 使用 pnpm 作為套件管理器

**備註**:

- 資料模型待與後端 Keystone 6 GraphQL Schema 對齊
- 圖片儲存方案待確認（AWS S3、Cloudinary 等）
- 支援五國語言：繁中、英、印尼、越南、泰文
- 後端 API Endpoint 需配置在 `.env` 中
