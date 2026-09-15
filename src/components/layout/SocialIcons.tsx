import { siteConfig } from "@/config/site";

const links = [
  {
    href: siteConfig.facebookUrl,
    label: "فيسبوك",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    href: siteConfig.instagramUrl,
    label: "إنستغرام",
    path: "M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.3.4.6.2 1.1.5 1.6 1 .5.5.8 1 1 1.6.2.5.4 1.2.4 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.3-.2.6-.5 1.1-1 1.6-.5.5-1 .8-1.6 1-.5.2-1.2.4-2.3.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.3-.4-.6-.2-1.1-.5-1.6-1-.5-.5-.8-1-1-1.6-.2-.5-.4-1.2-.4-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.3.2-.6.5-1.1 1-1.6.5-.5 1-.8 1.6-1 .5-.2 1.2-.4 2.3-.4C8.9 2 9.3 2 12 2Zm0 1.8c-2.6 0-3 0-4 .1-.9 0-1.4.2-1.7.3-.4.2-.7.3-1 .6-.3.3-.5.6-.6 1-.1.3-.3.8-.3 1.7-.1 1-.1 1.4-.1 4s0 3 .1 4c0 .9.2 1.4.3 1.7.2.4.3.7.6 1 .3.3.6.5 1 .6.3.1.8.3 1.7.3 1 .1 1.4.1 4 .1s3 0 4-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.3 1-.6.3-.3.5-.6.6-1 .1-.3.3-.8.3-1.7.1-1 .1-1.4.1-4s0-3-.1-4c0-.9-.2-1.4-.3-1.7-.2-.4-.3-.7-.6-1-.3-.3-.6-.5-1-.6-.3-.1-.8-.3-1.7-.3-1-.1-1.4-.1-4-.1Zm0 3.5a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4Zm0 1.8a2.9 2.9 0 1 0 0 5.8 2.9 2.9 0 0 0 0-5.8Zm4.9-2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
  {
    href: siteConfig.tiktokUrl,
    label: "تيك توك",
    path: "M16.7 2h-3.2v13.6a2.7 2.7 0 1 1-2.1-2.6v-3.3a6 6 0 1 0 5.3 6V8.3a7.4 7.4 0 0 0 4.3 1.4V6.5a4.2 4.2 0 0 1-4.3-4.2Z",
  },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:border-brand-teal hover:text-brand-teal"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d={link.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
