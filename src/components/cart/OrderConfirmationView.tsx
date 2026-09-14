"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/catalog";
import { buildOrderWhatsAppMessage } from "@/lib/order";
import { whatsappUrl } from "@/data/branches";
import type { Order } from "@/types/cart";

const LAST_ORDER_KEY = "sard-last-order";

export default function OrderConfirmationView() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    // One-time read of the order the checkout step just wrote to sessionStorage;
    // this page has no server data to hydrate from, so an effect is required.
    // The cart is cleared here (rather than during checkout submit) so the
    // checkout page never sees an empty cart while it's still navigating away.
    try {
      const raw = window.sessionStorage.getItem(LAST_ORDER_KEY);
      if (raw) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrder(JSON.parse(raw));
        clearCart();
      } else {
        setOrder(null);
      }
    } catch {
      setOrder(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (order === null) router.replace("/");
  }, [order, router]);

  if (!order) return null;

  const whatsappHref = `${whatsappUrl}?text=${encodeURIComponent(buildOrderWhatsAppMessage(order))}`;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-teal/15 text-2xl text-brand-teal-dark">
        ✓
      </span>
      <h1 className="font-serif text-3xl text-brand-ink">تم استلام طلبك</h1>
      <p className="text-brand-ink/60">
        رقم الطلب <span dir="ltr">#{order.id}</span> — الدفع عند الاستلام
      </p>

      <div className="mt-4 w-full rounded-2xl border border-brand-ink/10 bg-white p-6 text-start">
        <ul className="flex flex-col gap-3 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <span className="text-brand-ink/70">
                {item.productName}
                {item.variantLabel ? ` (${item.variantLabel})` : ""} × {item.quantity}
              </span>
              <span className="shrink-0 font-medium text-brand-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-brand-ink/10 pt-4 text-sm">
          <span className="text-brand-ink/70">المجموع الفرعي</span>
          <span className="font-semibold text-brand-ink">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="mt-4 border-t border-brand-ink/10 pt-4 text-sm text-brand-ink/70">
          <p>{order.customer.name} — <span dir="ltr">{order.customer.phone}</span></p>
          <p>
            {order.customer.city}، {order.customer.address}
          </p>
        </div>
      </div>

      <p className="mt-2 text-sm text-brand-ink/60">
        أرسل تفاصيل طلبك عبر واتساب حتى نبدأ بتجهيزه فوراً.
      </p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-full bg-brand-teal px-8 py-3 text-sm font-semibold text-white hover:bg-brand-teal-dark"
      >
        تأكيد الطلب عبر واتساب
      </a>
      <Link href="/catalog" className="text-sm text-brand-ink/60 hover:text-brand-teal-dark">
        متابعة التسوق
      </Link>
    </div>
  );
}
