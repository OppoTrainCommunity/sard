import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { CartView } from "@/components/cart";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `السلة | ${siteConfig.name}`,
};

export default function CartPage() {
  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-xs text-brand-ink/50 sm:px-12">
          <Link href="/" className="hover:text-brand-teal-dark">
            الرئيسية
          </Link>
          <span className="mx-2">‹</span>
          <span>السلة</span>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-12">
          <h1 className="mb-8 font-serif text-3xl text-brand-ink">سلة المشتريات</h1>
          <CartView />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
