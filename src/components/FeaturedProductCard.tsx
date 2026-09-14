import Image from "next/image";
import Link from "next/link";
import { formatPrice, getCategoryBySlug } from "@/lib/catalog";
import type { Product } from "@/types/catalog";

export default function FeaturedProductCard({ product }: { product: Product }) {
  const category = getCategoryBySlug(product.category);
  const priceLabel = product.contactForPricing
    ? "السعر عند الطلب"
    : formatPrice(Math.min(...product.variants.map((v) => v.price)));

  return (
    <Link
      href={`/catalog/${product.category}`}
      className="group flex w-44 shrink-0 flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white sm:w-52"
    >
      <div className="relative h-32 w-full sm:h-36">
        <Image src={product.image} alt={product.name} fill sizes="208px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        {category && (
          <span className="text-[11px] font-medium uppercase tracking-wide text-brand-teal-dark">
            {category.name}
          </span>
        )}
        <h3 className="line-clamp-1 text-sm font-semibold text-brand-ink">{product.name}</h3>
        <span className="text-xs text-brand-ink/50">{priceLabel}</span>
        <span className="mt-1 text-xs font-medium text-brand-teal-dark">‹ عرض المنتج</span>
      </div>
    </Link>
  );
}
