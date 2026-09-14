import Image from "next/image";
import Link from "next/link";
import { formatCount } from "@/lib/catalog";
import type { Category } from "@/types/catalog";

export default function CategoryCard({
  category,
  image,
  count,
  variant = "grid",
}: {
  category: Category;
  image: string;
  count: number;
  variant?: "grid" | "full";
}) {
  if (variant === "full") {
    return (
      <Link
        href={`/catalog/${category.slug}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white transition-colors hover:border-brand-teal-dark"
      >
        <div className="relative h-40 w-full">
          <Image src={image} alt={category.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg text-brand-ink">{category.name}</h3>
            <span className="shrink-0 rounded-full border border-brand-ink/15 px-2.5 py-0.5 text-xs text-brand-ink/60">
              {formatCount(count)}
            </span>
          </div>
          {category.description && (
            <p className="line-clamp-2 text-sm text-brand-ink/60">{category.description}</p>
          )}
          <span className="mt-auto pt-2 text-sm font-medium text-brand-teal-dark">
            ‹ عرض الفئة والمنتجات
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/catalog/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-brand-ink/10 bg-white transition-colors hover:border-brand-teal-dark"
    >
      <div className="relative h-32 w-full">
        <Image src={image} alt={category.name} fill sizes="25vw" className="object-cover" />
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <span className="font-semibold text-brand-ink">{category.name}</span>
        <span className="shrink-0 text-xs text-brand-ink/50">‹ {formatCount(count)}</span>
      </div>
    </Link>
  );
}
