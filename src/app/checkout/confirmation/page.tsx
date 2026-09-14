import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { OrderConfirmationView } from "@/components/cart";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `تم استلام طلبك | ${siteConfig.name}`,
};

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <SiteHeader />
      <main className="flex flex-1 flex-col px-6 py-16 sm:px-12">
        <OrderConfirmationView />
      </main>
      <SiteFooter />
    </div>
  );
}
