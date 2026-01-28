import type { Meta, StoryObj } from '@storybook/react'
import { Loader2, Mail, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Default button
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

// Primary action button
export const Primary: Story = {
  args: {
    children: 'Post Article',
    variant: 'default',
  },
}

// Destructive action
export const Destructive: Story = {
  args: {
    children: 'Delete Post',
    variant: 'destructive',
  },
}

// Outline variant
export const Outline: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
  },
}

// Secondary variant
export const Secondary: Story = {
  args: {
    children: 'Save Draft',
    variant: 'secondary',
  },
}

// Ghost variant
export const Ghost: Story = {
  args: {
    children: 'Skip',
    variant: 'ghost',
  },
}

// Link variant
export const Link: Story = {
  args: {
    children: 'Learn more',
    variant: 'link',
  },
}

// With icon
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail className="mr-2 h-4 w-4" />
        Login with Email
      </>
    ),
  },
}

// Icon only
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Plus className="h-4 w-4" />,
  },
}

// Loading state
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Posting...
      </>
    ),
  },
}

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}
