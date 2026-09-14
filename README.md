# Sard Chocolate

Online chocolate and chocolate gift shop delivering in Nablus, Bethlehem, and Ramallah.

## Stack

- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS)
- **Backend/data:** Firestore, accessed server-side only via the Admin SDK (see `src/lib/firebase/admin.ts`)
- **Hosting:** Google Cloud (project `sard-508612`)
- **Checkout:** cash on delivery for now; payment gateway integration planned later

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For local Firestore access, copy `.env.local.example` to `.env.local` and fill in a service account's credentials. On Cloud Run, Application Default Credentials are used automatically and no env vars are needed.
