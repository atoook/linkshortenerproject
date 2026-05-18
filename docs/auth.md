# Authentication — Clerk v7

## Rules

- **Clerk is the only authentication provider.** Do not implement any other auth method (sessions, JWTs, NextAuth, custom credentials, etc.).
- All auth state, user identity, and session management must come from Clerk APIs exclusively.

## Protected Routes

- `/dashboard` is a protected route — unauthenticated users must be redirected to sign in.
- Protect it via Clerk middleware (`clerkMiddleware`) in `middleware.ts`. Use `auth().protect()` or route matchers — do not hand-roll guards.

## Redirects

- If an authenticated user visits `/` (homepage), redirect them to `/dashboard`.
- Implement this redirect in `middleware.ts` or in the homepage route handler/server component using `auth()` — do not duplicate logic in both.

## Sign In / Sign Up

- Sign in and sign up must always open as a **Clerk modal** — never navigate to a dedicated sign-in/sign-up page.
- Use the `mode="modal"` prop on `<SignInButton>` / `<SignUpButton>`, or configure `<SignIn>` / `<SignUp>` components with modal mode.
- Do not create custom `/sign-in` or `/sign-up` routes.

## Clerk Components & Hooks

| Need                        | Use                                      |
| --------------------------- | ---------------------------------------- |
| Trigger sign-in modal       | `<SignInButton mode="modal">`            |
| Trigger sign-up modal       | `<SignUpButton mode="modal">`            |
| Display user avatar / menu  | `<UserButton>`                           |
| Read auth state (server)    | `auth()` from `@clerk/nextjs/server`     |
| Read auth state (client)    | `useAuth()` / `useUser()` from `@clerk/nextjs` |
| Middleware protection       | `clerkMiddleware` from `@clerk/nextjs/server` |
