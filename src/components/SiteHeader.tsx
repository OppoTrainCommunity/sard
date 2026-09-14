import Link from "next/link";
import Logo from "@/components/Logo";
import { whatsappUrl } from "@/data/branches";

export default function SiteHeader() {
  return (
    <header className="border-b border-brand-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden gap-6 text-sm font-medium text-brand-ink/70 sm:flex">
            <Link href="/" className="hover:text-brand-teal-dark">
              الرئيسية
            </Link>
            <Link href="/catalog" className="hover:text-brand-teal-dark">
              المتجر
            </Link>
            <Link href="/#delivery" className="hover:text-brand-teal-dark">
              فروعنا
            </Link>
            <Link href="/#contact" className="hover:text-brand-teal-dark">
              تواصل معنا
            </Link>
          </nav>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal-dark"
          >
            <span aria-hidden>💬</span>
            <span dir="rtl">تواصل معنا</span>
          </a>
        </div>
      </div>
    </header>
  );
}
