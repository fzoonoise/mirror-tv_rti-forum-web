'use client'

import MDEditor, { type MDEditorProps } from '@uiw/react-md-editor'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/**
 * Markdown Editor Component
 *
 * A simple WYSIWYG-style markdown editor with toolbar buttons.
 * Users can click toolbar buttons to format text (H2, bold, italic, etc.)
 * without needing to know markdown syntax.
 *
 * Features:
 * - Toolbar with formatting buttons (H1-H6, bold, italic, code, etc.)
 * - Live preview
 * - Light/Dark theme support
 *
 * Usage with React Hook Form:
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { MarkdownEditor } from '@/components/markdown/MarkdownEditor'
 *
 * function MyForm() {
 *   const { register, watch, setValue } = useForm()
 *   const content = watch('content')
 *
 *   return (
 *     <MarkdownEditor
 *       value={content}
 *       onChange={(value) => setValue('content', value || '')}
 *     />
 *   )
 * }
 * ```
 */

export type MarkdownEditorProps = {
  value?: string
  onChange?: (value?: string) => void
  height?: number
  preview?: 'live' | 'edit' | 'preview'
  hideToolbar?: boolean
  placeholder?: string
} & Omit<MDEditorProps, 'value' | 'onChange'>

export function MarkdownEditor({
  value = '',
  onChange,
  height = 400,
  preview = 'live',
  hideToolbar = false,
  placeholder = 'Enter your content here...',
  ...props
}: MarkdownEditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={onChange}
        height={height}
        preview={preview}
        hideToolbar={hideToolbar}
        textareaProps={{
          placeholder,
        }}
        {...props}
      />
    </div>
  )
}

/**
 * Markdown Viewer Component (Read-only)
 *
 * Display markdown content without editing capability.
 * Useful for showing post content, comments, etc.
 */
export type MarkdownViewerProps = {
  content: string
  className?: string
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export function MarkdownViewer({
  content,
  className = '',
  ...props
}: MarkdownViewerProps) {
  return (
    <div
      data-color-mode="light"
      className={className}
      {...props}
    >
      <MDEditor.Markdown source={content} />
    </div>
  )
}
