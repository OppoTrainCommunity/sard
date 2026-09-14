"use client";

import { useCart } from "@/context/CartContext";

export default function AddToCartControl({
  id,
  productId,
  productName,
  productImage,
  categorySlug,
  variantLabel,
  price,
}: {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  categorySlug: string;
  variantLabel: string | null;
  price: number;
}) {
  const { getQuantity, addItem, setQuantity } = useCart();
  const quantity = getQuantity(id);

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={() =>
          addItem({
            id,
            productId,
            productName,
            productImage,
            categorySlug,
            variantLabel,
            price,
          })
        }
        className="rounded-full bg-brand-teal px-3 py-1 text-xs font-semibold text-white hover:bg-brand-teal-dark"
      >
        + أضف للسلة
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-brand-ink/15 px-1 py-0.5">
      <button
        type="button"
        onClick={() => setQuantity(id, quantity - 1)}
        aria-label="إنقاص الكمية"
        className="flex h-6 w-6 items-center justify-center rounded-full text-brand-ink hover:bg-brand-ink/5"
      >
        −
      </button>
      <span className="min-w-4 text-center text-xs font-semibold text-brand-ink">{quantity}</span>
      <button
        type="button"
        onClick={() => addItem({ id, productId, productName, productImage, categorySlug, variantLabel, price })}
        aria-label="زيادة الكمية"
        className="flex h-6 w-6 items-center justify-center rounded-full text-brand-ink hover:bg-brand-ink/5"
      >
        +
      </button>
    </div>
  );
}
