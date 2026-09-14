import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { CheckoutView } from "@/components/cart";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `إتمام الطلب | ${siteConfig.name}`,
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-xs text-brand-ink/50 sm:px-12">
          <Link href="/" className="hover:text-brand-teal-dark">
            الرئيسية
          </Link>
          <span className="mx-2">‹</span>
          <Link href="/cart" className="hover:text-brand-teal-dark">
            السلة
          </Link>
          <span className="mx-2">‹</span>
          <span>إتمام الطلب</span>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-12">
          <h1 className="mb-8 font-serif text-3xl text-brand-ink">إتمام الطلب</h1>
          <CheckoutView />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
