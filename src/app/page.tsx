import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CategoryCard from "@/components/CategoryCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { branches, whatsappUrl } from "@/data/branches";
import { getAllProducts, getCategories, getCategoryImage, getProductsByCategory } from "@/lib/catalog";

const CITIES = branches.map((b) => b.city);

export default function Home() {
  const categories = getCategories().slice(0, 8);
  const featuredProducts = getAllProducts().slice(0, 10);
  const heroImage = getCategoryImage("colored-chocolate");

  return (
    <div className="flex flex-1 flex-col bg-brand-cream">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <section className="border-b border-brand-ink/10">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-12 lg:grid-cols-2 lg:py-24">
            <div className="order-2 flex flex-col gap-6 text-center lg:order-1 lg:text-start">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-teal-dark">
                نوصل إلى {CITIES.join(" · ")}
              </p>
              <h1 className="font-serif text-4xl leading-tight text-brand-ink sm:text-5xl">
                شوكولاتة يدوية الصنع، تُهدى بعناية
              </h1>
              <p className="mx-auto max-w-md text-base text-brand-ink/70 lg:mx-0">
                اطلب مجموعاتنا من الشوكولاتة وعلب الهدايا أونلاين — ادفع عند الاستلام، وتصلك مباشرة إلى باب المنزل.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/catalog"
                  className="rounded-full bg-brand-teal px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-teal-dark"
                >
                  تصفح المجموعة
                </Link>
                <Link
                  href="/catalog"
                  className="rounded-full border border-brand-ink/15 px-8 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-teal-dark hover:text-brand-teal-dark"
                >
                  ‹ عرض جميع الفئات
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
                <Image src={heroImage} alt="شوكولاتة سارد" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-12">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-brand-ink sm:text-3xl">استكشف المنتجات حسب الفئة</h2>
            <p className="mt-2 text-sm text-brand-ink/60">تصفح مجموعاتنا من الشوكولاتة والهدايا المميزة</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                image={getCategoryImage(category.slug)}
                count={getProductsByCategory(category.slug).length}
                variant="grid"
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/catalog"
              className="rounded-full border border-brand-ink/15 px-8 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-teal-dark hover:text-brand-teal-dark"
            >
              ‹ عرض جميع الفئات
            </Link>
          </div>
        </section>

        <section className="border-y border-brand-ink/10 bg-white py-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-12">
            <div className="text-center">
              <h2 className="font-serif text-2xl text-brand-ink sm:text-3xl">منتجات مختارة</h2>
              <p className="mt-2 text-sm text-brand-ink/60">أشهى مجموعاتنا من الشوكولاتة والهدايا</p>
            </div>
            <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
              {featuredProducts.map((product) => (
                <FeaturedProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section id="delivery" className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-12">
          <h2 className="text-center font-serif text-2xl text-brand-ink sm:text-3xl">فروعنا</h2>
          <p className="mt-2 text-center text-sm text-brand-ink/60">توصيل حسب الطلب مع الدفع عند الاستلام</p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {branches.map((branch) => (
              <div key={branch.city} className="rounded-2xl border border-brand-ink/10 bg-white p-5 text-sm">
                <p className="font-serif text-lg text-brand-ink">{branch.city}</p>
                <p className="mt-1 text-brand-ink/60">{branch.area}</p>
                <a href={`tel:${branch.phone}`} dir="ltr" className="mt-2 block text-brand-teal-dark hover:underline">
                  {branch.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-brand-ink py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:px-12">
            <span className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">
              متاح للطلب والتوصيل السريع
            </span>
            <h2 className="max-w-lg font-serif text-3xl">لا تجد المنتج الذي تبحث عنه؟</h2>
            <p className="max-w-md text-white/60">تواصل معنا مباشرة وسنساعدك في اختيار الهدية المثالية</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="rounded-full bg-brand-teal px-8 py-3 text-sm font-semibold text-white hover:bg-brand-teal-dark"
              >
                <span dir="rtl">تواصل معنا عبر واتساب</span>
              </a>
              <a
                href="https://www.facebook.com/sardchocolate"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:border-white"
              >
                زوروا صفحتنا على فيسبوك
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
