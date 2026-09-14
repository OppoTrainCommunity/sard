"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/catalog";
import { branches } from "@/data/branches";
import type { Order } from "@/types/cart";

const LAST_ORDER_KEY = "sard-last-order";

export default function CheckoutView() {
  const router = useRouter();
  const { items, isReady, subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(branches[0].city);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isReady && items.length === 0) {
      router.replace("/cart");
    }
  }, [isReady, items.length, router]);

  if (!isReady || items.length === 0) {
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }

    setSubmitting(true);
    const customer = { name: name.trim(), phone: phone.trim(), city, address: address.trim(), notes: notes.trim() };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, items, subtotal }),
      });
      const data = await res.json();

      const order: Order = {
        id: data.orderId ?? `local-${Date.now()}`,
        items,
        subtotal,
        customer,
        createdAt: new Date().toISOString(),
      };

      try {
        window.sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      } catch {
        // ignore blocked storage
      }

      router.push("/checkout/confirmation");
    } catch {
      setError("تعذر إرسال الطلب، حاول مرة أخرى أو تواصل معنا عبر واتساب");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-8">
        <section className="rounded-2xl border border-brand-ink/10 bg-white p-6">
          <h2 className="font-serif text-lg text-brand-ink">عنوان التوصيل</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-brand-ink/70">
              الاسم الكامل *
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-brand-ink/15 px-4 py-2.5 text-brand-ink outline-none focus:border-brand-teal-dark"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-brand-ink/70">
              رقم الهاتف *
              <input
                required
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl border border-brand-ink/15 px-4 py-2.5 text-end text-brand-ink outline-none focus:border-brand-teal-dark"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-brand-ink/70">
              المدينة *
              <select
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-xl border border-brand-ink/15 px-4 py-2.5 text-brand-ink outline-none focus:border-brand-teal-dark"
              >
                {branches.map((b) => (
                  <option key={b.city} value={b.city}>
                    {b.city}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-brand-ink/70 sm:col-span-2">
              العنوان التفصيلي *
              <input
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="اسم الشارع، رقم المبنى، معلم قريب"
                className="rounded-xl border border-brand-ink/15 px-4 py-2.5 text-brand-ink outline-none focus:border-brand-teal-dark"
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-brand-ink/70 sm:col-span-2">
              ملاحظات (اختياري)
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="rounded-xl border border-brand-ink/15 px-4 py-2.5 text-brand-ink outline-none focus:border-brand-teal-dark"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-brand-ink/10 bg-white p-6">
          <h2 className="font-serif text-lg text-brand-ink">طريقة الدفع</h2>
          <div className="mt-4 flex items-center gap-3 rounded-xl border-2 border-brand-teal-dark bg-brand-teal/5 px-4 py-3">
            <input type="radio" checked readOnly className="accent-brand-teal-dark" />
            <span className="text-sm font-medium text-brand-ink">💵 الدفع عند الاستلام</span>
          </div>
        </section>
      </div>

      <div className="h-fit rounded-2xl border border-brand-ink/10 bg-white p-6">
        <h2 className="font-serif text-lg text-brand-ink">ملخص الطلب</h2>
        <ul className="mt-4 flex flex-col gap-3 text-sm">
          {items.map((item) => (
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
          <span className="font-semibold text-brand-ink">{formatPrice(subtotal)}</span>
        </div>
        <p className="mt-2 text-xs text-brand-ink/50">
          تكلفة التوصيل تُحدد حسب المنطقة وتُؤكَّد معك عند التواصل.
        </p>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 block w-full rounded-full bg-brand-teal px-8 py-3 text-center text-sm font-semibold text-white hover:bg-brand-teal-dark disabled:opacity-60"
        >
          {submitting ? "جارٍ الإرسال..." : "تأكيد الطلب"}
        </button>
        <p className="mt-3 text-center text-xs text-brand-ink/50">
          بإتمام الطلب، سنتواصل معك عبر واتساب لتأكيد التفاصيل.
        </p>
        <Link href="/cart" className="mt-3 block text-center text-sm text-brand-ink/60 hover:text-brand-teal-dark">
          العودة للسلة
        </Link>
      </div>
    </form>
  );
}
