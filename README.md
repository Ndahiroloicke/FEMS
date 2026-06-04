# Fire Extinguisher Management System

## Design Link

```
https://www.figma.com/design/pZLPQK2xmQ1184lePEbfAX/FEMS-%E2%80%94-Login---Registration-Mockup?node-id=0-1&t=AyTfTsydzdji896h-0
```

Full-stack system for tracking fire extinguisher sales, expiry dates, customer notifications, and police escalations when units are not returned.

## Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Web      | Next.js, TypeScript, Tailwind CSS   |
| Mobile   | Expo (React Native), TypeScript     |
| Backend  | NestJS (modular monolith), Swagger  |
| Database | PostgreSQL                          |
| ORM      | Prisma                              |

## Prerequisites

- Node.js 20+
- PostgreSQL installed locally, or access to a hosted Postgres instance (e.g. Supabase, Neon, Railway)

## Database setup (no Docker)

1. Install PostgreSQL on your machine if you have not already.
2. Create a database:

```sql
CREATE DATABASE fire_extinguisher;
```

3. Copy the backend env file and set your connection string:

```bash
cd backend
cp .env.example .env
```

Edit `DATABASE_URL` in `.env` to match your Postgres user, password, host, and database name:

```
postgresql://postgres:your_password@localhost:5432/fire_extinguisher?schema=public
```

4. Run migrations:

```bash
npm run prisma:migrate
```

If migrate times out with `P1002` / advisory lock errors, close other Prisma terminals or run:

```bash
npm run db:unlock
npm run prisma:migrate
```

## Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run start:dev
```

- API: http://localhost:3001/api
- Swagger docs: http://localhost:3001/api/docs

## Frontend

```bash
cd frontend
npm install
npm run dev
```

- App: http://localhost:3000

Set `NEXT_PUBLIC_API_URL=http://localhost:3001/api` in `frontend/.env.local` if needed.

## Mobile app

```bash
cd mobile
npm install
cp .env.example .env
npm start
```

Uses the **same NestJS backend** as the web app. Set `EXPO_PUBLIC_API_URL` in `mobile/.env`:

| Environment        | API URL                              |
| ------------------ | ------------------------------------ |
| iOS simulator      | `http://localhost:3001/api`          |
| Android emulator   | `http://10.0.2.2:3001/api`           |
| Physical device    | `http://YOUR_PC_LAN_IP:3001/api`     |

Then press `i` (iOS) or `a` (Android) in the Expo terminal, or scan the QR code with Expo Go.

**Mobile screens (same as web):** Dashboard, Customers, Extinguishers, Notifications, Escalations — including register customer/sale, mark delivered/returned, run compliance checks, and report to police modal.

## Core workflow

1. **Register customer** — name, national ID, phone, optional email/address
2. **Record sale** — serial number, purchase date, expiry date, link to customer
3. **Mark delivered** — when the unit is handed to the customer
4. **Expiry warnings** — daily job notifies customers before expiry (default: 30 days)
5. **Police escalation** — if a delivered unit passes expiry without being returned, an escalation case is created for staff to report to police

## API modules

- `Customers` — customer CRUD
- `Fire Extinguishers` — inventory and status (ACTIVE, DELIVERED, RETURNED, EXPIRED)
- `Notifications` — sent expiry and escalation messages
- `Escalations` — police escalation cases
- `Compliance` — manual trigger for expiry/escalation checks
- `Dashboard` — summary statistics
