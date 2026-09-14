import { whatsappUrl } from "@/data/branches";
import { formatPrice } from "@/lib/catalog";
import type { Product } from "@/types/catalog";
import ProductPlaceholder from "./ProductPlaceholder";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white">
      <ProductPlaceholder src={product.image} alt={product.name} className="h-40 w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-serif text-lg text-brand-ink">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-brand-ink/60">{product.description}</p>
        )}

        {product.contactForPricing ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto self-start rounded-full border border-brand-teal-dark px-4 py-1.5 text-sm font-medium text-brand-teal-dark hover:bg-brand-teal-dark hover:text-white"
          >
            تواصل معنا للسعر
          </a>
        ) : (
          <ul className="mt-auto flex flex-col gap-1 text-sm text-brand-ink/80">
            {product.variants.map((variant, i) => (
              <li key={i} className="flex items-center justify-between gap-3">
                <span>{variant.label ?? "السعر"}</span>
                <span className="font-semibold text-brand-teal-dark">
                  {formatPrice(variant.price)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
