import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import {
  MarkdownEditor,
  MarkdownViewer,
} from '@/components/markdown/MarkdownEditor'
import { MarkdownFormExample } from '@/components/markdown/MarkdownFormExample'

const meta = {
  title: 'Components/Markdown',
  component: MarkdownEditor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MarkdownEditor>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic Markdown Editor
 *
 * Click the toolbar buttons to format text:
 * - **B** for bold
 * - *I* for italic
 * - **H2** for heading 2
 * - **Code** for code block
 * - etc.
 *
 * No need to memorize Markdown syntax!
 */
export const BasicEditor: Story = {
  render: () => {
    const [value, setValue] = useState('## Hello World\n\nStart typing...')
    return (
      <MarkdownEditor
        value={value}
        onChange={(val) => setValue(val || '')}
        height={300}
      />
    )
  },
}

/**
 * Edit Mode Only
 *
 * Shows only the editor without live preview.
 * Good for focused writing experience.
 */
export const EditModeOnly: Story = {
  render: () => {
    const [value, setValue] = useState('# My Post\n\nEdit mode only.')
    return (
      <MarkdownEditor
        value={value}
        onChange={(val) => setValue(val || '')}
        preview="edit"
        height={400}
      />
    )
  },
}

/**
 * Preview Mode Only
 *
 * Shows only the preview without editor.
 * Good for reviewing content before submission.
 */
export const PreviewModeOnly: Story = {
  render: () => {
    const content = `# Sample Post

## Introduction
This is a **preview mode** example.

### Features
- Item 1
- Item 2
- Item 3

\`\`\`typescript
const hello = "world"
\`\`\`
`
    return <MarkdownEditor value={content} preview="preview" height={400} />
  },
}

/**
 * Markdown Viewer (Read-only)
 *
 * Display markdown content without editing capability.
 * Perfect for showing post content, comments, etc.
 */
export const Viewer: Story = {
  render: () => {
    const content = `# Forum Post Title

## Introduction
This is a **read-only** markdown viewer.

### Supported Features
- **Bold** text
- *Italic* text
- ~~Strikethrough~~
- [Links](https://example.com)
- \`inline code\`

### Code Blocks
\`\`\`javascript
function hello() {
  console.log("Hello World")
}
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

> Blockquote example
`
    return <MarkdownViewer content={content} className="prose max-w-none" />
  },
}

/**
 * With React Hook Form
 *
 * Complete example showing how to integrate Markdown Editor
 * with React Hook Form and Zod validation.
 *
 * Try:
 * 1. Leave title/content empty and submit (see validation errors)
 * 2. Fill in valid data and submit (see console log)
 * 3. Use toolbar buttons to format content
 */
export const WithReactHookForm: Story = {
  render: () => <MarkdownFormExample />,
  parameters: {
    layout: 'padded',
  },
}
