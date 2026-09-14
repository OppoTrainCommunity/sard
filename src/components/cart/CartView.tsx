"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/catalog";

export default function CartView() {
  const { items, isReady, setQuantity, removeItem, subtotal } = useCart();

  if (!isReady) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-lg text-brand-ink/70">سلتك فارغة</p>
        <Link
          href="/catalog"
          className="rounded-full bg-brand-teal px-8 py-3 text-sm font-semibold text-white hover:bg-brand-teal-dark"
        >
          تصفح المتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-brand-ink/10 bg-white p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
              <Image src={item.productImage} alt={item.productName} fill sizes="80px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="font-medium text-brand-ink">{item.productName}</span>
              {item.variantLabel && (
                <span className="text-sm text-brand-ink/60">{item.variantLabel}</span>
              )}
              <span className="text-sm font-semibold text-brand-teal-dark">
                {formatPrice(item.price)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2 rounded-full border border-brand-ink/15 px-1 py-0.5">
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, item.quantity - 1)}
                  aria-label="إنقاص الكمية"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-brand-ink hover:bg-brand-ink/5"
                >
                  −
                </button>
                <span className="min-w-5 text-center text-sm font-semibold text-brand-ink">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.id, item.quantity + 1)}
                  aria-label="زيادة الكمية"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-brand-ink hover:bg-brand-ink/5"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="text-xs text-brand-ink/50 hover:text-red-600"
              >
                إزالة
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="h-fit rounded-2xl border border-brand-ink/10 bg-white p-6">
        <h2 className="font-serif text-lg text-brand-ink">ملخص الطلب</h2>
        <div className="mt-4 flex items-center justify-between text-sm text-brand-ink/70">
          <span>المجموع الفرعي</span>
          <span className="font-semibold text-brand-ink">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-brand-ink/50">
          تكلفة التوصيل تُحدد حسب المنطقة وتُؤكَّد معك عند إتمام الطلب.
        </p>
        <Link
          href="/checkout"
          className="mt-6 block w-full rounded-full bg-brand-teal px-8 py-3 text-center text-sm font-semibold text-white hover:bg-brand-teal-dark"
        >
          إتمام الطلب
        </Link>
        <Link
          href="/catalog"
          className="mt-3 block w-full text-center text-sm text-brand-ink/60 hover:text-brand-teal-dark"
        >
          متابعة التسوق
        </Link>
      </div>
    </div>
  );
}
