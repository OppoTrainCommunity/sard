function CocoaPodMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" className={className} fill="currentColor" aria-hidden>
      <path d="M17,28 C23,42 23,72 17,86 C11,72 11,42 17,28 Z" />
      <path d="M43,28 C49,42 49,72 43,86 C37,72 37,42 43,28 Z" />
      <path d="M30,6 C36,22 36,68 30,88 C24,68 24,22 30,6 Z" />
    </svg>
  );
}

export default function Logo({
  theme = "light",
  className,
}: {
  theme?: "light" | "dark";
  className?: string;
}) {
  const textColor = theme === "dark" ? "text-white" : "text-brand-ink";

  return (
    <span dir="ltr" className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <CocoaPodMark className="h-8 w-5 text-brand-teal" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl ${textColor}`}>Sard</span>
        <span className="font-sans text-[10px] tracking-[0.2em] text-brand-teal-dark">chocolate</span>
      </span>
    </span>
  );
}
