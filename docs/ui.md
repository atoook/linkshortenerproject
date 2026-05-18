# UI Components — shadcn/ui

All UI elements in this project use [shadcn/ui](https://ui.shadcn.com/).

## Rules

- **Never create custom UI components.** Always use shadcn/ui components.
- Install missing components with: `npx shadcn@latest add <component>`
- Import from `@/components/ui/<component>`.

## Usage

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

## Customization

Customize shadcn/ui components by passing a `className` prop with Tailwind utilities. Do **not** wrap them in custom components or override their internals.

```tsx
<Button className="w-full mt-4">Submit</Button>
<Input className="rounded-lg border-gray-300" />
```

Tailwind classes are merged via `cn()` (`@/lib/utils`) inside each component, so additional classes compose safely.

### Composition Over Creation

Prefer composing existing shadcn/ui primitives together over building new components from scratch. Only create a truly custom component when shadcn/ui has no equivalent.

## Available Components

Check `components/ui/` for already-installed components. Add new ones via the CLI rather than writing them by hand.
