# Firebase 認證串接：逐步實現計劃

**建立日期**: 2026-02-05
**最後更新**: 2026-02-05 (updated workflow + migration cross-ref + keystone.ts audit)
**狀態**: 執行中
**參考文件**: `fyi_authentication_strategy.md`（架構設計與背景）、`CLAUDE.md`（後端 API docs + coding standards）

---

## 執行規則（Execution Workflow）

每個 Step 完成後必須依序執行以下三個動作，才能進入下一個 Step：

1. **Commit** — 將該步驟涉及的所有文件變更用 conventional commit 提交（例如 `feat: add graphql proxy api route`）。不要將多個步驟的變更混在一個 commit 裡。
2. **確認** — 向使用者說明該步驟已完成、commit 訊息、以及簡要說明了什麼。詢問是否確認無問題、同意繼續下一步。
3. **更新計劃** — 若該步驟完成後發現任何新問題、與計劃有偏差、或後續步驟需要調整，在開始下一步之前先更新本文件（`fyi_firebase_implementation_steps.md`）當前狀態快照和相關步驟，保持計劃與實際同步。若沒有需要調整的，將當前狀態快照裡該步驟的文件標記為 ✅。

**目的**: 保持每個階段易於評估和回溯，計劃可隨時反映實際進度。

---

## 當前狀態快照

| 文件 | 狀態 | 說明 |
|---|---|---|
| `lib/firebase.ts` | ✅ 完成 | Firebase 初始化，無需修改 |
| `graphql/mutations/auth.ts` | ✅ 完成 | 回傳欄位正確（配合後端 `MemberSessionMember`，見 Issue #4） |
| `graphql/queries/auth.ts` | ✅ 完成 | 同上 |
| `graphql/fragments/member.ts` | ⚠️ 無法使用 | fragment 是 `on Member`，但 auth 端點回傳 `MemberSessionMember`，類型不匹配（見 Issue #4） |
| `types/graphql.ts` | ⚠️ 需修正 | `customId`、`name`、`nickname` 不應為 optional（見 Issue #9） |
| `app/[locale]/(auth)/login/page.tsx` | ❌ 不存在 | 需新建：shadcn/ui 登入表單，接 `useAuth` hook（Step 8） |
| `lib/env.ts` | ⚠️ 需更新 | 目前 `NEXT_PUBLIC_GRAPHQL_ENDPOINT` 為 required；Proxy 模式下應改為 server-side `GRAPHQL_ENDPOINT`（不加 `NEXT_PUBLIC_`）|
| `lib/apollo.ts` | ❌ 需重構 | 目前用 localStorage + authLink；需改為指向 `/api/graphql`，移除認證邏輯 |
| `stores/authStore.ts` | ❌ 需重構 | 目前存 `sessionToken` 於 localStorage；Token 不再在客戶端，應移除 |
| `middleware.ts` | ❌ 需擴充 | 目前僅處理 i18n；需加入 session cookie 檢查 + protected route redirect（⚠️ 見下方 Issue #3） |
| `actions/auth.ts` | ❌ 不存在 | 需新建：Server Action for login/logout（⚠️ 見下方 Issue #1、#5） |
| `app/api/graphql/route.ts` | ❌ 不存在 | 需新建：Proxy API Route |
| `hooks/useAuth.ts` | ❌ 不存在 | 需新建：Auth hook（Firebase 登入 + 狀態管理） |

---

## 2026-02-05 交叉比對審查結果

將 `fyi_authentication_strategy.md`（架構設計）、本文（逐步計劃）、實際代碼現狀、以及 context7 驗證的 Next.js 16.1.5 / Firebase SDK 官方範例三方交叉比對後，發現以下需要注意的問題。

---

### Issue #1：`actions/auth.ts` 裡打後端的 GraphQL body 需要明確指定格式

**位置**: 實現步驟 Step 3
**優先度**: 🔴 必須處理（否則無法打通後端）

計劃說「用 raw `fetch` POST `AUTHENTICATE_MEMBER_WITH_FIREBASE` mutation」，但沒有說明 body 的具體結構。

- `graphql/mutations/auth.ts` 裡的 `AUTHENTICATE_MEMBER_WITH_FIREBASE` 是 `gql` tagged template，它的類型是 `DocumentNode`，**不能直接序列化為字串**傳給 `fetch`。
- Server Action 是 server-side code，不能 import Apollo Client（那是 browser-side singleton）。
- 所以 Server Action 裡必須**手動寫出 GraphQL query 的字串**，或從 `gql` 物件裡提取 `print(doc)` 轉為字串。

**建議的處理方式**:

```typescript
// actions/auth.ts — 打後端時用字串，不用 gql
// 欄位列表固定為後端 MemberSessionMember 的 6 個欄位（見 Issue #4）
const MUTATION_QUERY = `
  mutation AuthenticateMemberWithFirebase(
    $data: AuthenticateMemberWithFirebaseInput!
  ) {
    authenticateMemberWithFirebase(data: $data) {
      sessionToken
      expiresAt
      member {
        id
        firebaseId
        customId
        name
        nickname
        email
      }
    }
  }
`

// fetch body:
JSON.stringify({
  query: MUTATION_QUERY,
  variables: { data: { idToken } },
})
```

這裡有一個潛在維護問題：mutation 字串現在出現在兩個地方（`graphql/mutations/auth.ts` 和 `actions/auth.ts`）。可以考慮在 `graphql/mutations/` 裡匯出一個 **plain string 版本**供 Server Action 用，或直接用 `graphql` 套件的 `print()` 函數將 `DocumentNode` 轉為字串。`graphql` 套件已經是 dependency（`^16.12.0`）。

---

### Issue #2：`lib/env.ts` 的 `NEXT_PUBLIC_GRAPHQL_ENDPOINT` 改為 optional 時會影響啟動

**位置**: 實現步驟 Step 1
**優先度**: 🟡 需要在 Step 1 一起處理

目前 `NEXT_PUBLIC_GRAPHQL_ENDPOINT` 是 `.string().url()` 且為 **required**（沒有 `.optional()`）。如果只單單增加新的 `GRAPHQL_ENDPOINT` 但沒同時將原來的改為 optional，且 `.env` 裡沒有設 `NEXT_PUBLIC_GRAPHQL_ENDPOINT`，應用程序會在啟動時因 Zod parse 失敗而 crash。

**正確的處理順序**:
1. 增加 `GRAPHQL_ENDPOINT: z.string().url()` (server-side, required)
2. 將 `NEXT_PUBLIC_GRAPHQL_ENDPOINT` 改為 `.optional()`
3. 同時更新 `.env` 和 `.env.example`

---

### Issue #3：`middleware.ts` 的 next-intl 組合方式需要特別處理

**位置**: 實現步驟 Step 7
**優先度**: 🔴 必須處理（否則 protected route 不會生效）

計劃說「在 i18n middleware 之後，加入 cookie 檢查邏輯」。但當前 middleware 的寫法是：

```typescript
export default createMiddleware({ locales, defaultLocale, localePrefix: 'as-needed' })
```

`createMiddleware` 直接返回一個 middleware 函數並匯出為 default — 無法直接「在後面加」邏輯。

**正確的組合方式（next-intl 4.x）**:

```typescript
import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
})

export default async function middleware(req: NextRequest) {
  // 先跑 i18n middleware
  const response = await intlMiddleware(req)

  // 然後做 protected route 檢查
  const session = req.cookies.get('session')
  const protectedRoutes: string[] = [] // 後來再填入具體路徑

  const pathname = req.nextUrl.pathname
  const isProtected = protectedRoutes.some((route) => pathname.includes(route))

  if (isProtected && !session) {
    // redirect 至登入頁（注意要帶上 locale prefix）
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', ],
}
```

**注意**: `intlMiddleware` 本身可能已經做了 redirect（locale 補充），所以 protected route check 裡的 redirect URL 也需要正確帶著 locale prefix。

---

### Issue #4：`MemberSessionMember` 是後端自定義 type，fragment 無法套用（重寫）

**位置**: `keystone.ts` 第 272–289 行（`MemberSessionMember` 定義）、`graphql/fragments/member.ts`
**優先度**: 🟡 不影響 auth 功能，但影響後續擴充方向

**2026-02-05 後端代碼審查更新**: 對照 `keystone.ts` 裡的實際實現，發現以下關鍵事實：

**後端 auth 端點回傳的不是 Keystone 自動生成的 `Member` type，而是手動定義的 `MemberSessionMember` custom type。** 該 type 被明確限定為 6 個欄位（`keystone.ts:272`）：

```typescript
// keystone.ts — 後端定義（唯讀參考，前端無法修改）
const MemberSessionMember = graphql.object({
    name: "MemberSessionMember",
    fields: {
        id:         graphql.field({ type: graphql.nonNull(graphql.ID) }),
        firebaseId: graphql.field({ type: graphql.nonNull(graphql.String) }),
        customId:   graphql.field({ type: graphql.nonNull(graphql.String) }),
        name:       graphql.field({ type: graphql.nonNull(graphql.String) }),
        nickname:   graphql.field({ type: graphql.nonNull(graphql.String) }),
        email:      graphql.field({ type: graphql.String }),  // nullable
    },
})
```

`mapMemberSessionMember`（`keystone.ts:339`）也只取出這 6 個欄位，即使 DB 裡 Member 表有更多欄位，`authenticateMemberWithFirebase` mutation 和 `authenticatedMember` query **都不會回傳 `avatar`, `language` 等**。

**對前端的影響**:
1. 當前 `graphql/mutations/auth.ts` 和 `graphql/queries/auth.ts` 請求的 6 個欄位是**正確的**，不需要修改。
2. `graphql/fragments/member.ts` 裡的 `fragment MemberFields on Member` 無法套用於這兩個端點——GraphQL fragment 的 `on` 指定的 type 必須匹配，而端點回傳的是 `MemberSessionMember`，不是 `Member`。**該 fragment 目前對 auth 流程無用。**
3. 若後來需要 `avatar`、`language` 等欄位，有兩個選項（見 Issue #10）。

**不需要的處理**: 不要在 mutation / query 裡加入 `avatar` 等欄位——後端不會回傳。

---

### Issue #5：Cookie `secure: true` 在本地開發環境會導致 Cookie 被瀏覽器丟掉

**位置**: 實現步驟 Step 3（`actions/auth.ts` 設定 cookie 的地方）
**優先度**: 🔴 必須處理（否則本地開發登入無法完成）

`fyi_authentication_strategy.md` §4 的範例裡用的是：

```typescript
cookies().set('session', token, {
  httpOnly: true,
  secure: true,        // ← 這裡
  sameSite: 'lax',
  path: '/',
})
```

`secure: true` 告訴瀏覽器「這個 Cookie 只能透過 HTTPS 傳送」。本地開發通常是 `http://localhost:3000`（非 HTTPS），所以瀏覽器會**直接丟掉這個 Cookie**，登入後無法帶上任何認證。

**Next.js 官方範例（context7 驗證過）的處理方式是**:

```typescript
secure: process.env.NODE_ENV === 'production',
```

這保證：
- 開發環境（`NODE_ENV=development`）: `secure: false`，Cookie 在 HTTP 也能設定
- 生產環境（`NODE_ENV=production`）: `secure: true`，強制 HTTPS

**需要同樣修改的地方**: Proxy API Route (`app/api/graphql/route.ts`) 如果回傳裡也有設 cookie 的話也需要一樣處理。

---

### Issue #6：Apollo Client singleton 在 SSR 會導致請求狀態泄露（潛在問題）

**位置**: `lib/apollo.ts`
**優先度**: 🟡 目前不急，但在 SSR 頁面開始用 Apollo 時會觸發

`apolloClient` 是一個模組級別的 singleton。在 Next.js 服務器端 (SSR)，模組只被 `require` 一次，之後同一個 instance 會被**所有 incoming request 共享**。這代表：
- 使用者 A 的 query 結果會緩存在同一個 `InMemoryCache` 裡，使用者 B 可能讀到 A 的數據。

Apollo Client 4.x 沒有改變這個基本行為。

**當前影響**: 目前 Apollo 主要從 Client Components 裡用（browser-side），singleton 不會影響到。但如果後來在 Server Component / SSR 裡用同一個 client 來打 `authenticatedMember` query，就會觸發此問題。

**後來需要處理的時候**: 在 Server Component 裡別用這個 singleton；改用 `new ApolloClient(...)` per-request，或用 raw `fetch` + `graphql` 打後端（和 Server Action 裡一樣的方式）。

---

### Issue #7：頁面刷新後的登入狀態恢復沒有對應的實現步驟

**位置**: 測試驗證要點 #3
**優先度**: 🟡 影響 UX，建議在 Step 6 完成後接著處理

測試要點裡列了「F5 重新讀取 → cookie 仍在 → 應可從後端拉回 `authenticatedMember` 來恢復登入狀態」。但七個步驟裡沒有哪個步驟說「在哪裡觸發這個拉數據的動作」。

Zustand store 在頁面刷新後會變為初始值（`member: null, isAuthenticated: false`）。Cookie 還在、Proxy 還會帶 Token，但Nobody 去打 `authenticatedMember` query 來把 store 補回來。

**建議的處理方式**:

在根 layout 或 `hooks/useAuth.ts` 裡加一個 **on-mount check**:

```typescript
// hooks/useAuth.ts 裡
useEffect(() => {
  // 頁面加載時，如果 store 為 empty，嘗試從後端拉當前使用者
  if (!member) {
    apolloClient.query({ query: GET_AUTHENTICATED_MEMBER })
      .then(({ data }) => {
        if (data?.authenticatedMember) {
          setAuth(data.authenticatedMember)
        }
      })
      .catch(() => {
        // 401 或其它錯誤：使用者沒有有效 session，不處理
      })
  }
}, [])
```

這個 effect 在首次 mount 時觸發，如果後端回傳了使用者資訊就補回 store。如果 cookie 已經過期或不存在，後端會回傳 null / 401，不做任何事。

---

### Issue #8：`Member.language` enum 值與 next-intl locale 不對應（後期議題）

**位置**: `types/graphql.ts`（Member type）、`hooks/useAuth.ts`（頁面刷新後狀態恢復時可用於設定 locale）
**優先度**: 🟢 目前暫緩（`language` 不在 `MemberSessionMember` 裡，見 Issue #10；等後來開始用 language 時再處理）

**發現來源**: `migrations/20251120064536_init/migration.sql` 裡 `MemberLanguageType` enum 定義為：

```sql
CREATE TYPE "MemberLanguageType" AS ENUM ('zh', 'en', 'vi', 'id', 'th');
```

但 next-intl 的 locale 配置（來自 CLAUDE.md）為：`zh-TW, en, id, vi, th`

| DB enum 值 | next-intl locale | 對應關係 |
|---|---|---|
| `zh` | `zh-TW` | ❌ 不匹配 |
| `en` | `en` | ✅ |
| `vi` | `vi` | ✅ |
| `id` | `id` | ✅ |
| `th` | `th` | ✅ |

**問題核心**: `zh` vs `zh-TW`。後端傳回的語言值是 `zh`，但 next-intl 路由用的 locale 是 `zh-TW`。

**需要確認的方向**:
- 後端是否會改為用 `zh-TW`？（Migration 需要修改）
- 還是前端做一層映射：`zh` → `zh-TW`？（簡單 map，不影響 DB）

在確認之前，前端先用映射 map 處理，不要直接將 `Member.language` 傳入 next-intl。

---

### Issue #9：`types/graphql.ts` 裡 Member 的 optionality 與後端 `MemberSessionMember` 不符

**位置**: `types/graphql.ts`（`Member` type 定義，第 4–11 行）
**優先度**: 🟡 需要在開始實現步驟之前修正，否則後來會產生不必要的 null check

**當前 TS type**:
```typescript
export type Member = {
  id: string
  firebaseId: string
  customId?: string   // ← optional ❌
  name?: string       // ← optional ❌
  nickname?: string   // ← optional ❌
  email?: string      // ← optional ✅（後端確實 nullable）
}
```

**對照後端 `MemberSessionMember` 的 GraphQL 定義**（`keystone.ts:272`）:

| 欄位 | 後端 GraphQL 類型 | 前端 TS 應該是 | 當前前端 | 狀態 |
|---|---|---|---|---|
| `id` | `ID!` (nonNull) | `string` | `string` | ✅ |
| `firebaseId` | `String!` (nonNull) | `string` | `string` | ✅ |
| `customId` | `String!` (nonNull) | `string` | `string \| undefined` | ❌ |
| `name` | `String!` (nonNull) | `string` | `string \| undefined` | ❌ |
| `nickname` | `String!` (nonNull) | `string` | `string \| undefined` | ❌ |
| `email` | `String` (nullable) | `string \| undefined` | `string \| undefined` | ✅ |

**正確的 type（修正後）**:
```typescript
export type Member = {
  id: string
  firebaseId: string
  customId: string
  name: string
  nickname: string
  email?: string
}
```

`email` 唯一個保持 optional——後端 `mapMemberSessionMember` 裡用了 `member.email ?? null`，明確允許 null。其餘三個都是 `nonNull`。

---

### Issue #10：登入後 `avatar`、`language` 等欄位無法從 auth 端點取得

**位置**: 後端 `keystone.ts` `MemberSessionMember` 定義
**優先度**: 🟡 auth 流程本身不受影響，但登入後 UI 若需顯示頭像或讀取語言偏好會遇到此問題

**背景**: `authenticateMemberWithFirebase` mutation 和 `authenticatedMember` query 回傳的都是 `MemberSessionMember`（僅 6 個欄位）。DB 裡的 `avatar`、`language`、`intro`、`verified` 等欄位不會從這兩個端點暴露。

**後來需要這些欄位時，兩個選項**:

| 選項 | 說明 | 優點 | 缺點 |
|---|---|---|---|
| A | 後端修改：擴充 `MemberSessionMember` 加入欄位，`mapMemberSessionMember` 對應映射 | 一次性解決，auth 回傳就帶完整數據 | 需要修改後端代碼 |
| B | 前端另開一個 query：登入後再打 Keystone 自動生成的 `Member` query 拉完整 profile | 不動後端 | 多一個網絡請求，需要確認 Keystone 的 `Member` query 的 access control 允許前端使用者讀取自己的資訊（目前 `member.ts` 裡 query access 限 admin/moderator/editor） |

**目前建議**: 先完成 auth 流程 7 個步驟（6 個欄位足夠啟動），之後再評估哪個選項更合適。

---

## 實現步驟

以下步驟按**依賴順序**排列。每個步驟的前提條件列在開頭，確保順序正確。

---

### Step 1：更新 `lib/env.ts`

**前提**: 無
**說明**: Proxy API Route 是在 server-side 讀取後端端點，不應使用 `NEXT_PUBLIC_` 前綴。需增加 server-side 環境變數 `GRAPHQL_ENDPOINT`。

**具體操作**:
- 增加 `GRAPHQL_ENDPOINT: z.string().url()` （server-side, required）
- 將 `NEXT_PUBLIC_GRAPHQL_ENDPOINT` 改為 `.optional()`（見 Issue #2，必須同時處理）
- 更新 `.env` 和 `.env.example`

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 2：建立 `app/api/graphql/route.ts`（Proxy API Route）

**前提**: Step 1（需要 `GRAPHQL_ENDPOINT` 環境變數）
**說明**: 這是整個架構的核心中轉層。所有來自客戶端的 GraphQL 請求經過此處，Proxy 負責讀取 HttpOnly Cookie 並附加 `Authorization` Header。

**具體操作**:
```
app/
└── api/
    └── graphql/
        └── route.ts    ← 新建
```

**Logic**:
1. `export async function POST(req: NextRequest)`
2. 從 `cookies()` 讀取 `session` cookie（`cookies()` 必須 `await`，Next.js 16 為 async API）
3. 將 `req.text()` 原封不動轉發至 `GRAPHQL_ENDPOINT`
4. 若 cookie 存在，附加 `Authorization: Bearer <value>`
5. 將後端回應原封不動傳回客戶端（status + body）

**注意**:
- 這個 route 自動不受 `middleware.ts` matcher 影響（路徑以 `/api` 開頭，已被排除）
- 不需要 middleware 參與

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 3：建立 `actions/auth.ts`（Server Action）

**前提**: Step 1（需要 `GRAPHQL_ENDPOINT`）
**說明**: 登入時從 Client Component 調用此 Server Action。它在服務器端完成 Firebase Token → Backend Session Token 的兌換，並設定 HttpOnly Cookie。

**具體操作**:
```
actions/
└── auth.ts    ← 新建
```

**exports**:
- `loginWithFirebase(idToken: string): Promise<Member>` — 登入
- `logout(): Promise<void>` — 登出（清除 cookie）

**Login Logic**:
1. 接收 Firebase `idToken`（由客戶端傳入）
2. 用 `fetch` 直接調用後端 GraphQL endpoint（不經過自己的 Proxy），POST body 為 `{ query: MUTATION_STRING, variables: { data: { idToken } } }`（見 Issue #1，必須用字串而非 `gql` 物件）
3. 從 response 裡取得 `sessionToken` + `member`
4. 用 `cookies().set(...)` 設定 HttpOnly Cookie:
   - name: `session`
   - httpOnly: true
   - **secure: `process.env.NODE_ENV === 'production'`**（見 Issue #5，本地開發必須為 false）
   - sameSite: `lax`
   - path: `/`
   - maxAge: 86400（配合後端 `MEMBER_SESSION_MAX_AGE`）
5. 返回 `member` 物件給客戶端（客戶端用來更新 Zustand store）

**Logout Logic**:
1. `cookies().delete('session')`（或設定 `maxAge: 0`）
2. 不需返回值

**注意**:
- `"use server"` directive 必須放在文件頂部
- Server Action 不能直接用 `gql` tagged template + Apollo 來打後端（Apollo Client 是 browser-side）
- 用 raw `fetch` + JSON body 打 GraphQL endpoint 即可

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 4：重構 `lib/apollo.ts`

**前提**: Step 2（Proxy 已建立）
**說明**: 移除所有 localStorage 和 authLink 邏輯。Apollo Client 現在只需知道打哪個 endpoint（`/api/graphql`），認證完全由 Proxy 處理。

**具體操作**:
- 移除 `setContext` import 和整個 `authLink`
- `createHttpLink` 的 `uri` 改為 `/api/graphql`（相對路徑，不需要環境變數）
- 移除 `env` import（不再需要）
- `link` 直接用 `httpLink`，不再 concat

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 5：重構 `stores/authStore.ts`

**前提**: 無（可與 Step 4 並行）
**說明**: Token 不再存在客戶端。Store 的責任縮減為：持有當前使用者的 `member` 資訊（內存緩存），供 UI 快速讀取。

**具體操作**:
- 移除 `sessionToken` field
- 移除 `setAuth` 裡的 `localStorage.setItem`
- 移除 `clearAuth` 裡的 `localStorage.removeItem`
- `setAuth` 的簽名改為 `(member: Member) => void`
- 內部 state 只剩：`member`, `isAuthenticated`

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 6：建立 `hooks/useAuth.ts`

**前提**: Step 3（`actions/auth.ts` 存在）、Step 5（`authStore` 已更新）
**說明**: 將 Firebase SDK 的登入調用、Server Action 的觸發、以及 Zustand store 的更新串在一起，對組件暴露一個簡潔的 hook 介面。同時處理頁面刷新後的狀態恢復（見 Issue #7）。

**具體操作**:
```
hooks/
└── useAuth.ts    ← 新建
```

**exports**:
- `useAuth()` hook，返回:
  - `member` — 當前使用者（來自 Zustand）
  - `isAuthenticated`
  - `login(email, password)` — 觸發 Firebase login → 拿 idToken → 調用 Server Action → 更新 store
  - `logout()` — 調用 Server Action logout → 清除 store → 觸發 Firebase signOut

**Login 內部流程**:
1. `signInWithEmailAndPassword(auth, email, password)` → 取得 `userCredential`
2. `userCredential.user.getIdToken()` → `idToken`
3. `const member = await loginWithFirebase(idToken)` — 調用 Server Action
4. `useAuthStore.getState().setAuth(member)` — 更新 Zustand

**頁面刷新後狀態恢復**（見 Issue #7）:
- 在 hook 裡加一個 `useEffect`，mount 時若 `member` 為 null，打 `GET_AUTHENTICATED_MEMBER` query
- 若後端回傳使用者資訊，用 `setAuth` 補回 store
- 若後端回傳 null / 401，不處理（使用者沒有有效 session）

**注意**:
- Server Action 必須在 Client Component 中透過 `useTransition` 或直接在 `async` function 裡 `await` 調用
- Firebase `signInWithEmailAndPassword` 會拋出 error（如帳號不存在、密碼錯誤），需在此處 catch 並拋出有意義的訊息

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 7：擴充 `middleware.ts`（Route Protection）

**前提**: Step 2（Proxy 存在，確認 cookie name 為 `session`）
**說明**: 在受保護路由上檢查 `session` cookie 是否存在。若不存在則 redirect 至登入頁。

**具體操作**（見 Issue #3，不能直接 append，必須用 wrapper 模式）:
- 將 `createMiddleware(...)` 的結果賽進一個變數（`intlMiddleware`）
- export default 改為自定義 async middleware function
- 先調用 `intlMiddleware(req)` 拿到 i18n 處理後的 response
- 再讀取 `req.cookies.get('session')` 做 protected route 檢查
- `config.matcher` 保持不變（已經排除 `/api`）

**初期 protected routes（草案）**:
- 可以先不設定任何 protected routes，middleware 只是架好框架
- 後來加入 forum 頁面時再逐個填入

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）

---

### Step 8：建立登入頁面 `app/[locale]/(auth)/login/page.tsx`

**前提**: Step 6（`useAuth` hook 存在）
**說明**: 用 shadcn/ui 組件搭建登入表單，接 `useAuth().login()` 觸發完整認證流程。這是能在瀏覽器裡實際端對端測試的入口點。shadcn/ui 的 `Form`、`Input`、`Button`、`Label` 均已裝好（見 CLAUDE.md Phase 1）。

**具體操作**:
```
app/
└── [locale]/
    └── (auth)/
        └── login/
            └── page.tsx    ← 新建
```

**組件技術方案**:
- `"use client"` — 使用 hooks 和 form state，必須是 Client Component
- shadcn/ui: `Form`、`FormField`、`FormControl`、`FormLabel`、`FormMessage`、`Input`、`Button`
- react-hook-form + zod + `@hookform/resolvers`：表單驗證（均已在 dependencies 裡）
- `useTranslations` (next-intl)：表單標記國際化
- `useRouter` (next/navigation)：登入成功後 redirect

**Zod schema**:
```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
type LoginFormData = z.infer<typeof loginSchema>
```

**Logic**:
1. `useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })` 建立表單
2. `onSubmit` 裡調用 `const { login } = useAuth()`，傳入 `email` 和 `password`
3. Success → `router.push('/')` redirect 至首頁
4. Error → `login()` 拋出的訊息顯示在表單下方（Firebase 錯誤由 Step 6 的 hook 已經 catch 並轉為訊息）
5. Submit 進行中：button `disabled`，可加簡單 loading 標記

**注意**:
- `login()` 內部涉及 Server Action 調用，在 `onSubmit` 裡用 `startTransition` 包裹（見 Step 6 注意事項）
- 頁面本身不接觸 Firebase SDK、不設定任何 cookie 或 token — 全部由 `useAuth` hook + Server Action 處理
- 不需要從 `graphql/` 裡 import 任何東西

**完成後**: commit → 確認 → 更新計劃（見上方「執行規則」）。此為最後一步。完成後將當前狀態快照裡所有步驟標記為 ✅，狀態改為 ✅ 全部完成。

---

## 環境變數變更

| 變數名 | 類型 | 說明 |
|---|---|---|
| `GRAPHQL_ENDPOINT` | server-side | 後端 GraphQL 的真正 URL（Proxy 和 Server Action 用） |
| `NEXT_PUBLIC_GRAPHQL_ENDPOINT` | 可移除或改為 optional | Apollo 不再直接打後端，可以不要 |

`.env.example` 需對應更新。

---

## 測試驗證要點（完成後確認以下流程）

1. **登入流程**: 輸入 email/password → Firebase 登入 → Server Action 設定 cookie → 頁面顯示已登入狀態
2. **Proxy 帶 Token**: 登入後發送任何 GraphQL query → 後端收到 `Authorization` header → 返回數據
3. **頁面刷新後狀態**: F5 重新讀取 → cookie 仍在 → `useAuth` hook 自動打 `authenticatedMember` 拉回狀態 → 頁面顯示已登入（見 Issue #7）
4. **登出流程**: 點登出 → cookie 清除 → 後續請求無 Authorization → 後端返回 unauthenticated 狀態
5. **Token 不可見**: 在瀏覽器 DevTools → Application → Cookies 裡看得見 `session` cookie，但在 Console 裡無法 `document.cookie` 讀到它
6. **本地開發登入可行**: 本地 HTTP 環境也能成功設定 cookie 並登入（見 Issue #5）

---

## Coding Standards 提醒（來自 CLAUDE.md）

- 用 `type` 不用 `interface`
- type import 用 `import type { ... }`
- 不用 `console.log`，只允許 `console.warn` / `console.error`
- unused 變數加 `_` 前綴
- commit message 用 conventional commits（`feat:` / `fix:` / `refactor:` 等）
