# Storybook Stories

This directory contains Storybook stories for the RTI Forum UI components.

## Running Storybook

```bash
pnpm storybook
```

This will start Storybook on `http://localhost:6006`

## Available Stories

The following component categories are available for preview:

### Core Components

- **Avatar**: User profile images with fallbacks.
- **Badge**: Status indicators and labels.
- **Button**: Primary, secondary, ghost, and destructive variants.
- **Card**: Container for grouped content.
- **Skeleton**: Loading placeholders.
- **Spinner**: Loading indicators.

### Form Elements

- **Checkbox**: Single selection elements.
- **Form**: Integrated examples using `react-hook-form` and `zod`.
- **Input**: Standard text input fields.
- **Label**: Accessible labels for form controls.
- **RadioGroup**: Multiple exclusive selection groups.
- **Select**: Customizable dropdown selection.
- **Textarea**: Multi-line text input areas.

### Overlays & Feedback

- **Dialog**: Modals, confirmation prompts, and alerts.
- **DropdownMenu**: Contextual menu actions.
- **Sonner**: Modern toast notifications.
- **Tabs**: Tabbed interface for content organization.

## Creating New Stories

1. Create a new `.stories.tsx` file in this directory.
2. Import the component from `@/components/ui/`.
3. Define stories using the Storybook CSF 3.0 format.
4. Run `pnpm storybook` to see your story.

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [lucide-react Icons](https://lucide.dev/icons)
