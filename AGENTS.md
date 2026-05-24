<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

This file is the entry point for LLM coding agents. All standards are mandatory — do not deviate without explicit instruction.

## Project Overview

A URL shortener web app where authenticated users can create short links, view them on a dashboard, and share them. Unauthenticated users see a public landing page with sign-in/sign-up options.

## Technology Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Framework     | Next.js 16 (App Router)     |
| Language      | TypeScript 5                |
| Auth          | Clerk v7                    |
| Database      | Neon (serverless Postgres)  |
| ORM           | Drizzle ORM                 |
| UI components | shadcn/ui + Tailwind CSS v4 |
| Icons         | Lucide React                |

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
