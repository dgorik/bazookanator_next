# Bazookanator 2.0

Bazookanator is an internal analytics platform built for Bazooka’s Sales, Finance, and Marketing teams. It turns static Excel- and spreadsheet-based workflows into a live, unified dashboard. With Bazookanator, you can track sales vs plan, monitor brand/SKU performance, view customer-level trends, and get on-demand analysis via an AI assistant.

## What it does

- Provides live dashboards for daily, month-to-date (MTD), and year-to-date (YTD) sales metrics.
- Breaks down performance by brand, SKU, division, and customer.
- Compares actual sales to plan, forecast, or baseline benchmarks (OP6/OP9).
- Enables filtering and exploration by brand, customer, date range, division, and SKU.
- Enables customer-level analysis: ordering trends, lapsed customers, repeat vs new customers.
- Supports natural-language querying over sales data — you can ask things like “Why are sales for Brand X down this month?” and get back structured data plus narrative insight.
- Automates ingestion of monthly financial/sales data from CSV uploads.
- Validates and normalizes incoming data, stores snapshots, and aggregates derived metrics.

## Tech stack

- Frontend: Next.js (App Router), React + TypeScript, TailwindCSS, shadcn/ui, Tremor (for charts)
- Backend & data: Supabase (Postgres + Auth + Storage + Edge Functions), Supabase Vector for embedding-based search, runtime schema validation (via Zod), TypeScript end to end
- AI layer: OpenAI API for embeddings and LLM-based insight generation, with prompt templates and contextual data access

## Architecture at a glance

- The frontend calls Supabase (RPC or REST) to fetch only aggregated and validated data.
- Raw tables are never exposed directly to the UI.
- Data ingestion pipeline: monthly uploads → validation → snapshots → transformations → aggregated tables / vector embeddings.
- The AI assistant queries the vector embeddings or aggregated tables (depending on the question) and returns either raw data, charts, or narrative analysis.

## Why this matters (impact)

- Replaces manual Excel-based reporting and reduces time to generate reports from hours to seconds.
- Provides a single source of truth for sales data — eliminates errors from manual copying and human mistakes.
- Enables deeper insight: you can spot brand/SKU or customer-level issues or trends that were previously hard to track.
- Gives leadership and teams real-time visibility into performance and helps drive informed decision-making.
- Makes data-driven planning easier: you can compare actuals vs plan/forecast quickly and regularly.

## How to run / develop locally

```bash
# Start Supabase locally (using Supabase CLI + Docker)
supabase start

# Install dependencies
npm install

# Run the development server
npm run dev
```

Make sure you have a `.env.local` with the necessary Supabase keys (API key, anon/public key, etc.). Do not expose service-role keys on the frontend.

## What’s in the repo

- Next.js app with components, pages, UI layout
- Supabase schema (tables, views), migrations if used, and edge function code for API/AI logic
- Data ingestion pipeline scripts (CSV import, data normalization, snapshots)
- AI-specific logic: embedding generation, vector store handling, prompt templates
- Validation schemas (Zod) to enforce data integrity before writing into DB

## Notes / Design principles

- No direct front-end access to raw tables — always deliver aggregated, validated data to avoid leaking raw/unprocessed data and to prevent consistency issues.
- Use TypeScript and runtime validation to avoid mistakes from typos (e.g. wrong field names) or malformed uploads.
- Treat vector-embedding + LLM as a first-class layer: if data is in DB and embeddings, the AI assistant should be able to reason about it.
- Keep data ingestion simple but robust: expect monthly uploads, perform validation, store snapshots so you can always audit or roll back.

## Contact / Author

Daniel Gorbachev — this version of Bazookanator is built, maintained, and owned by me.
