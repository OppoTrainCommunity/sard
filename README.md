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

## Project structure

```
src/
  app/                  routes only (page.tsx / layout.tsx per segment)
    catalog/            all-categories page
    catalog/[slug]/     per-category product listing
  components/
    layout/             SiteHeader, SiteFooter, Logo — shared on every page
    catalog/            CategoryCard, ProductCard, FeaturedProductCard, ProductPlaceholder
  config/
    site.ts             site name, description, nav links, social URLs — single source of truth
  data/
    catalog.json         product/category content (see .assets/catalog for how it was derived)
    branches.ts          store locations + WhatsApp contact link
  lib/
    catalog.ts           read helpers over data/catalog.json
    firebase/admin.ts     Firestore Admin SDK init (server-side only)
  types/
    catalog.ts           shared TypeScript types for catalog data
public/
  products/              product photos, grouped by source (facebook/, sard/)
```

Each `components/` subfolder has an `index.ts` barrel, so pages import like:

```ts
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ProductCard, CategoryCard } from "@/components/catalog";
```

Add new site-wide links/constants to `config/site.ts` rather than hardcoding them in a component, so header/footer/metadata stay in sync.
