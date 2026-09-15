# Sard Chocolate

Online chocolate and chocolate gift shop delivering in Nablus, Bethlehem, and Ramallah.

## Stack

- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS)
- **Backend/data:** Firestore (`me-west1`), accessed server-side only via the Admin SDK (see `src/lib/firebase/admin.ts`)
- **Hosting:** Cloud Run (project `sard-508612`, region `me-west1`)
- **Checkout:** cash on delivery for now; payment gateway integration planned later

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For local Firestore access, run `gcloud auth application-default login` once (signed in with an account that has access to `sard-508612`) — the Admin SDK picks up Application Default Credentials automatically. Alternatively, copy `.env.local.example` to `.env.local` and fill in a service account's key.

## Deployment

Live at **https://sard.web.app** (Firebase Hosting, proxying all requests to the Cloud Run service below — set up so the public URL is short; `firebase.json`/`.firebaserc` in the repo document that rewrite). The underlying Cloud Run service is also directly reachable at https://sard-256609110246.me-west1.run.app.

Redeploy the app after changes (Firebase Hosting's rewrite doesn't need to be touched again unless the Cloud Run service/region changes):

```bash
docker build --platform linux/amd64 -t me-west1-docker.pkg.dev/sard-508612/sard-app/sard:latest .
docker push me-west1-docker.pkg.dev/sard-508612/sard-app/sard:latest
gcloud run deploy sard \
  --image me-west1-docker.pkg.dev/sard-508612/sard-app/sard:latest \
  --region me-west1
```

The Cloud Run service runs as a dedicated `sard-app@sard-508612.iam.gserviceaccount.com` service account with only `roles/datastore.user` (Firestore read/write) — no broad Editor role, no key file needed. Requires an amd64 build; on Apple Silicon, `--platform linux/amd64` cross-compiles via QEMU (slower, but correct).

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
