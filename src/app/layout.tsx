import type { Metadata } from "next";
import { Cairo, Markazi_Text } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const markaziText = Markazi_Text({
  variable: "--font-markazi",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "سارد شوكولاتة",
  description:
    "سارد — متجر شوكولاتة وهدايا شوكولاتة أونلاين، يوصل إلى نابلس وبيت لحم ورام الله.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${markaziText.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
