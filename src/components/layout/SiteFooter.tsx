import Link from "next/link";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import { branches, whatsappUrl } from "@/data/branches";
import { getCategories } from "@/lib/catalog";
import { siteConfig } from "@/config/site";

export default function SiteFooter() {
  const featuredCategories = getCategories().slice(0, 5);
  const quickLinks = siteConfig.navLinks.filter((link) => link.href !== "/#contact");

  return (
    <footer className="bg-brand-ink text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-10 px-6 py-14 text-sm sm:px-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo theme="dark" />
          <p className="mt-3 max-w-xs text-white/60">{siteConfig.description}</p>
        </div>

        <div>
          <p className="mb-4 font-semibold text-white">روابط سريعة</p>
          <ul className="flex flex-col gap-2 text-white/60">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-teal">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 font-semibold text-white">فئات مميزة</p>
          <ul className="flex flex-col gap-2 text-white/60">
            {featuredCategories.map((category) => (
              <li key={category.slug}>
                <Link href={`/catalog/${category.slug}`} className="hover:text-brand-teal">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <p className="mb-4 font-semibold text-white">تواصل معنا</p>
          <ul className="flex flex-col gap-4 text-white/60">
            {branches.map((branch) => (
              <li key={branch.city} className="flex flex-col gap-0.5">
                <span className="font-medium text-white/90">{branch.city}</span>
                <span>{branch.area}</span>
                <a href={`tel:${branch.phone}`} dir="ltr" className="w-fit hover:text-brand-teal">
                  {branch.phone}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="mt-4 block w-fit text-white/60 hover:text-brand-teal"
          >
            💬 تواصل عبر واتساب
          </a>
          <div className="mt-4">
            <SocialIcons />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/50 sm:px-12">
        © {new Date().getFullYear()} {siteConfig.name}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
