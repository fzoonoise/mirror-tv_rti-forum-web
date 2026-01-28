# Storybook Stories

This directory contains Storybook stories for the RTI Forum UI components.

## Running Storybook

```bash
pnpm storybook
```

This will start Storybook on `http://localhost:6006`

## Available Stories

### Button (`Button.stories.tsx`)
Demonstrates all button variants used in the forum:
- Primary actions (Post Article)
- Destructive actions (Delete Post)
- Icon buttons and loading states
- All sizes and variants

### Dialog (`Dialog.stories.tsx`)
Shows common dialog patterns:
- Confirmation dialogs (delete confirmation)
- Report dialog with form validation
- Login modal
- Simple alerts

### Form (`Form.stories.tsx`)
Form examples with Zod validation:
- Login form (email/password)
- Create post form (title, category, content)
- Profile form (username, display name, bio)

## Creating New Stories

1. Create a new `.stories.tsx` file in this directory
2. Import the component from `@/components/ui/`
3. Define stories using the Storybook CSF 3.0 format
4. Run `pnpm storybook` to see your story

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [lucide-react Icons](https://lucide.dev/icons)
