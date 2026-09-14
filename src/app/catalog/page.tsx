import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/layout";
import { CategoryCard } from "@/components/catalog";
import { branches, whatsappUrl } from "@/data/branches";
import { getAllProducts, getCategories, getCategoryImage, getProductsByCategory } from "@/lib/catalog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `المتجر | ${siteConfig.name}`,
};

export default function CatalogPage() {
  const categories = getCategories();
  const totalProducts = getAllProducts().length;

  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 text-xs text-brand-ink/50 sm:px-12">
          <Link href="/" className="hover:text-brand-teal-dark">
            الرئيسية
          </Link>
          <span className="mx-2">‹</span>
          <span>المتجر</span>
        </div>

        <section className="px-6 pb-12 text-center sm:px-12">
          <h1 className="font-serif text-3xl text-brand-ink sm:text-4xl">تصفح المنتجات حسب الفئة</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-brand-ink/60">
            تصفح القائمة الكاملة والمنظمة لجميع منتجات وهدايا سارد شوكولاتة
          </p>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                image={getCategoryImage(category.slug)}
                count={getProductsByCategory(category.slug).length}
                variant="full"
              />
            ))}
          </div>
        </section>

        <section className="border-y border-brand-ink/10 bg-white py-10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 text-center sm:grid-cols-3 sm:px-12">
            <div>
              <p className="font-serif text-3xl text-brand-teal-dark">{totalProducts}+</p>
              <p className="mt-1 text-sm text-brand-ink/60">منتج مميز</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-brand-teal-dark">{categories.length}</p>
              <p className="mt-1 text-sm text-brand-ink/60">فئة رئيسية</p>
            </div>
            <div>
              <p className="font-serif text-3xl text-brand-teal-dark">{branches.length}</p>
              <p className="mt-1 text-sm text-brand-ink/60">فروع في الضفة الغربية</p>
            </div>
          </div>
        </section>

        <section className="bg-brand-ink py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:px-12">
            <span className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">
              مساعدتكم هي أولويتنا دائماً
            </span>
            <h2 className="max-w-lg font-serif text-3xl">لم تجد الفئة أو الصنف الذي تبحث عنه؟</h2>
            <p className="max-w-md text-white/60">
              تواصل معنا مباشرة وسيساعدك فريقنا في اختيار الهدية أو الطلب المناسب
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="mt-2 rounded-full bg-brand-teal px-8 py-3 text-sm font-semibold text-white hover:bg-brand-teal-dark"
            >
              <span dir="rtl">تواصل معنا عبر واتساب</span>
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
