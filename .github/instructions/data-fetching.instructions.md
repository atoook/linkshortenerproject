---
description: This file describes the data fetching instructions for the project.
---

# Data Fetching Guidelines

This document outlines the data fetching conventions and best practices for the Link Shortener Project. Adhering to these guidelines ensures consistency, maintainability, and optimal performance across the codebase.

## 1. Use Server Components for Data Fetching

In Next.js, ALWAYS use Server Components for data fetching . NEVER use Client Components to fetch data.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the/data directory to fetch data. NEVER fetch data directory in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions. NEVER use raw SQL queries or other database libraries.
