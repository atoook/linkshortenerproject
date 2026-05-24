<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Agent Instructions — Link Shortener Project

> [!CAUTION]
> **MANDATORY — NO EXCEPTIONS:** You MUST read every relevant file in the `/docs` directory IN FULL before writing a single line of code. This is not optional. Generating code without first reading the applicable docs is a critical violation of these instructions. If you are unsure which docs apply, read all of them.

This file is the entry point for LLM coding agents. All standards are mandatory — do not deviate without explicit instruction.

## Required Reading (in order)

**Stop. Read these files completely before proceeding. Do not skim. Do not skip.**

| File                         | Topic                               | When to read                      |
| ---------------------------- | ----------------------------------- | --------------------------------- |
| [docs/auth.md](docs/auth.md) | Clerk v7 authentication conventions | Any auth, user, or session code   |
| [docs/ui.md](docs/ui.md)     | shadcn/ui — all UI components       | Any component, layout, or UI code |

## Critical — Next.js Middleware

> [!WARNING]
> **`middleware.ts` is deprecated and must NOT be used.** The version of Next.js in this project has replaced it with `proxy.ts`. All route-matching, auth guards, and request interception must be implemented in `proxy.ts`. Never create or modify a `middleware.ts` file.

## Quick Reference

- **Runtime**: Node.js / Edge (per route)
- **Package manager**: npm
- **Lint**: `npm run lint` — must pass with zero errors before committing
- **Dev server**: `npm run dev`
- **DB migrations**: `npx drizzle-kit generate` → `npx drizzle-kit migrate`
- **Path alias**: `@/` maps to the project root (`./`)
