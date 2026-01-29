'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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

import { MarkdownEditor, MarkdownViewer } from './MarkdownEditor'

/**
 * Form Schema with Zod Validation
 */
const postFormSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(5000, 'Content must not exceed 5000 characters'),
})

type PostFormData = z.infer<typeof postFormSchema>

/**
 * Markdown Editor with React Hook Form Example
 *
 * This example demonstrates how to integrate the Markdown Editor
 * with React Hook Form and Zod validation.
 *
 * Features:
 * - Form validation with Zod
 * - Error messages
 * - Preview of submitted content
 */
export function MarkdownFormExample() {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  function onSubmit(data: PostFormData) {
    console.log('Form submitted:', data)
    alert('Form submitted! Check console for data.')
  }

  const submittedContent = form.watch('content')

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your post title" {...field} />
                </FormControl>
                <FormDescription>
                  A catchy title for your post (5-100 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Markdown Content Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <MarkdownEditor
                    value={field.value}
                    onChange={field.onChange}
                    height={300}
                    preview="edit"
                    placeholder="Write your post content in Markdown..."
                  />
                </FormControl>
                <FormDescription>
                  Use the toolbar buttons to format your text. Click the eye
                  icon to preview.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit">Submit Post</Button>
        </form>
      </Form>

      {/* Preview Section */}
      {submittedContent && (
        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Preview</h3>
          <MarkdownViewer content={submittedContent} />
        </div>
      )}
    </div>
  )
}
