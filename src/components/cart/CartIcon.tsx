"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { totalCount, isReady } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-brand-ink hover:bg-brand-ink/5"
      aria-label="السلة"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 7h1.5l1.2 9.6A2 2 0 0 0 8.7 18.4h7.6a2 2 0 0 0 2-1.8L19.5 9H6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7a3 3 0 1 1 6 0" strokeLinecap="round" />
      </svg>
      {isReady && totalCount > 0 && (
        <span className="absolute -top-1 -end-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-teal px-1 text-[11px] font-semibold text-white">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
