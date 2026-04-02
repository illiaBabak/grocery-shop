# 🛒 GroceryShop

> A full-stack pet project — online grocery store built to learn Prisma ORM and deepen Next.js knowledge

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Babylon.js](https://img.shields.io/badge/Babylon.js-BB464B?style=for-the-badge&logo=babylondotjs&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

![Start](https://docs.google.com/uc?id=1H2Cr56n5AkSMFEOs7PUkyuTXT_eNbeE_)
![Products](https://docs.google.com/uc?id=1TgHtDZ1FCQZ3h4Co86b_oD9UCJ0rg6Qt)
![Product](https://docs.google.com/uc?id=1yv2oY-7BKEK-l4y3luZN1DVtjzhX5Fi5)
![User](https://docs.google.com/uc?id=12UjQGK2ikZhHVSwbcR5-sLK-47MAp8Q5)

## 🎯 Project Goal

This project was built as a **full-stack grocery store**, with the main purpose to:

- **Learn Prisma ORM** — schema design, migrations, relations, seeding and the new Prisma 7 config
- **Deepen Next.js knowledge** — App Router, Server Components, Server Actions, API routes, middleware
- **Integrate Stripe** — checkout sessions, webhooks, payment flow
- **Practice Docker** — multi-stage builds, docker compose for dev/test/prod environments

## 🚀 Tech Stack

### Core

- **Next.js 16** (App Router, Turbopack) — full-stack React framework
- **React 19** — UI library with Server Components and `useActionState`
- **TypeScript** — strict typing throughout the project
- **Prisma 7** — ORM for PostgreSQL with typed client generation
- **PostgreSQL 15** — relational database (via Docker)

### Payments & Storage

- **Stripe** — checkout sessions, webhooks, payment processing
- **Supabase** — image storage for product photos

### UI & Animations

- **Tailwind CSS 4** — utility-first styling
- **Babylon.js** — interactive 3D basket model on the landing page
- **Motion** — smooth page transitions and animations
- **react-toastify** — toast notifications

### Data Fetching

- **TanStack Query (React Query v5)** — client-side data fetching, mutations, caching

### Testing

- **Cypress** — E2E tests covering auth, cart, checkout, reviews, user profile

### DevOps

- **Docker** — separate Dockerfiles for dev and production (multi-stage build)
- **Docker Compose** — three configs: `compose.yaml` (dev), `compose.test.yaml` (test), `compose.production.yaml` (prod)
- **dotenv-cli** — environment-specific `.env` files per mode

## ✨ Features

### 🏠 Landing Page

- Hero section with interactive **3D basket** (Babylon.js + `.glb` model)
- Category cards linking to filtered product listings

### 🛍️ Product Catalog

- Filter by category, price range, rating
- Sort by price or rating
- Search by name
- Product detail page with image, description, price per kg

### 🛒 Shopping Cart

- Add/remove items with quantity
- Cart persisted in `localStorage` (survives page reloads and Stripe redirects)
- Cross-tab synchronization via `StorageEvent`

### 💳 Stripe Checkout

- Authenticated and **guest checkout** support
- Stripe Checkout Sessions with success/cancel redirects
- Webhook handler for payment confirmation and order status updates
- Post-checkout toast notifications

### ⭐ Reviews

- Leave star ratings (1–5) and text reviews on products
- Edit and delete your own reviews
- Auto-recalculated average rating per product

### 👤 User Profile

- Profile page with avatar, name, email
- Inline name editing via Server Actions (re-signs JWT)
- Order history with status, date, total, and item details
- Logout

### 🔐 Authentication

- Registration and login with `argon2` password hashing
- JWT-based sessions stored in `httpOnly` cookies
- Server-side `getUser()` verification

## 🛠 Prerequisites

- **Node.js** v22+
- **pnpm**
- **Docker** & **Docker Compose**
- **Stripe CLI** (for webhook forwarding in dev/test)

## ⚙️ Environment Variables

The project uses **three** `.env` files managed by `dotenv-cli`:

| File        | Used by                                 | Description             |
| ----------- | --------------------------------------- | ----------------------- |
| `.env.dev`  | `pnpm dev`, `pnpm seed`                 | Development environment |
| `.env.test` | `pnpm test`, `pnpm seed:test`           | Test environment        |
| `.env`      | `pnpm build`, `pnpm start`, Docker prod | Production environment  |

Each file requires the following variables:

```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=grocery-shop
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/grocery-shop

# PgAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

# Auth
JWT_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (image storage) — public keys, safe to share

NEXT_PUBLIC_SUPABASE_URL=https://zwguspmymqpdnwnnxyns.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3Z3VzcG15bXFwZG53bm54eW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwMTAwNzQsImV4cCI6MjA4OTU4NjA3NH0.8aSvTnxQ3fOWmrAjdGsSo9cfxL9XVedewMnWEcVQMwo

# Stripe (use your own test keys from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # ← obtained from Stripe CLI (see below)
```

## 🚀 Running the Project

> In dev and test modes, **Next.js runs locally** (not in Docker) because Turbopack hot reload is significantly faster outside a container. Only the database and pgAdmin run in Docker. In production, everything runs in Docker.

### Stripe CLI (required for all modes)

Before starting the app, run Stripe CLI in a **separate terminal** to forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This will print a webhook signing secret like `whsec_...` — copy it into `STRIPE_WEBHOOK_SECRET` in the corresponding `.env` file.

### Development

**1. Start the database:**

```bash
docker compose up -d
```

**2. Run seed:**

```bash
pnpm seed
```

The app will be available at `http://localhost:3000`.

> **Docker:** the `Dockerfile` uses `entrypoint.dev.sh` which automatically runs `prisma migrate dev` → `prisma generate` → `pnpm dev`.

### Testing

**1. Start the test database:**

```bash
docker compose -f compose.test.yaml up -d
```

**2. Run migrations and seed:**

```bash
pnpm seed:test
```

**3. Run Cypress:**

```bash
pnpm test          # headless
pnpm test:open     # interactive UI
```

### Production (Docker)

Everything runs in Docker — Next.js, PostgreSQL, and pgAdmin:

```bash
docker compose -f compose.production.yaml up --build
```

The `entrypoint.sh` inside the container will automatically:

1. Run `prisma migrate deploy` to apply pending migrations
2. Start `next start` on port `3000`

The compose file handles the rest:

- Multi-stage build via `Dockerfile.prod` (base → deps → build → runner)
- PostgreSQL healthcheck — the app container waits until the DB is ready
- `DATABASE_URL` is overridden to point to the internal Docker network (`db:5432`)

## 📁 Project Structure

```text
app/
├── layout.tsx                          # Root layout
├── globals.css                         # Global styles
├── not-found.tsx                       # 404 page
├── (auth)/
│   ├── login/                          # Login page + server actions
│   └── register/                       # Registration page + server actions
├── (root)/
│   ├── layout.tsx                      # App layout (Header, Footer, Cart, Toast)
│   ├── (start)/                        # Landing page with 3D basket
│   ├── about/                          # About page
│   ├── main/                           # Product catalog with filters
│   ├── product/[id]/                   # Product detail + reviews
│   └── user/                           # Profile + order history
└── api/
    ├── checkout/route.ts               # Stripe checkout session creation
    ├── food/route.ts                   # Product listing API
    └── stripe/webhook/route.ts         # Stripe webhook handler

components/                             # Shared UI components
contexts/                               # React contexts (Cart, React Query)
lib/                                    # Server-side logic
├── auth/                               # Auth helpers (login, register, JWT)
├── food/                               # Food queries
├── orders/                             # Order CRUD
├── reviews/                            # Review CRUD + rating recalculation
├── storage/                            # Supabase image URL helper
├── prisma.ts                           # Prisma client instance
└── stripe.ts                           # Stripe client instance
services/                               # Client-side API layer (queries, mutations)
utils/                                  # Helpers (guards, constants, capitalize)
prisma/
├── schema.prisma                       # Database schema
├── seed.ts                             # Seed script
└── migrations/                         # Migration history
cypress/
├── e2e/                                # E2E test specs
└── support/                            # Custom commands (login, register)
```

## 🧪 Testing

E2E tests use **Cypress** with `data-testid` selectors for resilience against UI text changes:

| Spec                 | Coverage                                             |
| -------------------- | ---------------------------------------------------- |
| `auth.cy.ts`         | Registration, login, validation errors, redirects    |
| `navigation.cy.ts`   | Header links, page transitions                       |
| `products.cy.ts`     | Product catalog, filters, product detail page        |
| `cart.cy.ts`         | Add/remove items, cart total, checkout flow          |
| `review.cy.ts`       | Create, edit, delete reviews                         |
| `user-profile.cy.ts` | Profile display, name editing, order history, logout |

## 🐳 Docker Overview

| File                      | Purpose                                                     |
| ------------------------- | ----------------------------------------------------------- |
| `Dockerfile`              | Dev image — installs deps, runs `entrypoint.dev.sh`         |
| `Dockerfile.prod`         | Multi-stage prod build (base → deps → build → runner)       |
| `compose.yaml`            | Dev — PostgreSQL + pgAdmin                                  |
| `compose.test.yaml`       | Test — PostgreSQL + pgAdmin (separate volume)               |
| `compose.production.yaml` | Prod — Next.js + PostgreSQL + pgAdmin (with healthcheck)    |
| `entrypoint.dev.sh`       | Dev startup: `migrate dev` → `prisma generate` → `pnpm dev` |
| `entrypoint.sh`           | Prod startup: `migrate deploy` → `next start`               |

---
