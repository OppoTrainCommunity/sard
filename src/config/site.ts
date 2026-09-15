export interface NavLink {
  href: string;
  label: string;
}

export const siteConfig = {
  name: "سارد شوكولاتة",
  description:
    "سارد — متجر شوكولاتة وهدايا شوكولاتة أونلاين، يوصل إلى نابلس وبيت لحم ورام الله.",
  url: "https://sard.web.app",
  facebookUrl: "https://www.facebook.com/sardchocolate",
  instagramUrl: "https://www.instagram.com/sardchocolate.ps",
  tiktokUrl: "https://www.tiktok.com/@sardchocolate.ps",
  navLinks: [
    { href: "/", label: "الرئيسية" },
    { href: "/catalog", label: "المتجر" },
    { href: "/#delivery", label: "فروعنا" },
    { href: "/#contact", label: "تواصل معنا" },
  ] satisfies NavLink[],
};
