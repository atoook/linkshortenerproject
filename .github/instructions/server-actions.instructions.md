---
description: Read this before implementing or modifying data mutation (server actions) in the project.
---

# Server Actions

## Rules

- **All data mutation must use server actions.** Do not perform mutations directly in route handlers, server components, or client components.
- Server actions must be called from **client components** only.
- Server action files **must be named `actions.ts`** and colocated in the same directory as the client component that calls them.

## TypeScript Types

- All data passed to server actions must have explicit TypeScript types.
- **Do NOT use the `FormData` TypeScript type.** Define a typed object or interface instead.

## Validation

- All input data must be validated inside the server action using **Zod** before any further processing.

## Authentication

- Every server action **must check for a logged-in user as its first operation**, before any database work.
- If no authenticated user is found, return an appropriate error — do not proceed.

## Database Access

- Database operations must be performed via **helper functions located in the `/data` directory**.
- Server actions must **not** import or call Drizzle queries directly. Delegate all database interaction to the `/data` helper functions.

## Return Values & Error Handling

- Server actions must **never throw errors**. All error cases must be handled gracefully.
- Every server action must return a plain object with either a `success` property or an `error` property — for example `{ success: true }` or `{ error: "Something went wrong" }`.
- Wrap the action body in a try/catch and return `{ error: "..." }` in the catch block instead of rethrowing.

## Summary Checklist

Before submitting a server action, verify:

- [ ] File is named `actions.ts` and colocated with the client component that calls it
- [ ] Called only from a client component
- [ ] Input data uses explicit TypeScript types (no `FormData`)
- [ ] Input is validated with Zod before any other logic
- [ ] Logged-in user is checked as the very first operation
- [ ] All database access goes through `/data` helper functions (no direct Drizzle queries)
- [ ] Returns `{ success: ... }` or `{ error: "..." }` — never throws
