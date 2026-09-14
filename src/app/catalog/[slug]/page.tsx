import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { ProductCard, CategoryCard } from "@/components/catalog";
import {
  formatCount,
  getCategories,
  getCategoryBySlug,
  getCategoryImage,
  getProductsByCategory,
} from "@/lib/catalog";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return { title: category ? `${category.name} | ${siteConfig.name}` : siteConfig.name };
}

export default async function CategoryPage({ params }: PageProps<"/catalog/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const relatedCategories = getCategories()
    .filter((c) => c.slug !== category.slug)
    .slice(0, 4);

  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-xs text-brand-ink/50 sm:px-12">
          <Link href="/" className="hover:text-brand-teal-dark">
            الرئيسية
          </Link>
          <span className="mx-2">‹</span>
          <Link href="/catalog" className="hover:text-brand-teal-dark">
            المتجر
          </Link>
          <span className="mx-2">‹</span>
          <span>{category.name}</span>
        </div>

        <section className="mx-auto w-full max-w-6xl px-6 pb-10 sm:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-[280px_1fr] sm:items-center">
            <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-full">
              <Image src={getCategoryImage(category.slug)} alt={category.name} fill sizes="280px" className="object-cover" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl text-brand-ink">{category.name}</h1>
                <span className="rounded-full border border-brand-ink/15 px-3 py-1 text-xs text-brand-ink/60">
                  {formatCount(products.length)}
                </span>
              </div>
              {category.description && (
                <p className="mt-3 max-w-2xl text-sm text-brand-ink/60">{category.description}</p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {relatedCategories.length > 0 && (
          <section className="border-t border-brand-ink/10 bg-white py-16">
            <div className="mx-auto max-w-6xl px-6 sm:px-12">
              <h2 className="font-serif text-2xl text-brand-ink">فئات ذات صلة</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {relatedCategories.map((c) => (
                  <CategoryCard
                    key={c.slug}
                    category={c}
                    image={getCategoryImage(c.slug)}
                    count={getProductsByCategory(c.slug).length}
                    variant="grid"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
