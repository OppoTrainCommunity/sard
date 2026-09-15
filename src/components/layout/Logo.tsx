import Image from "next/image";

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
      <Image src="/brand/cocoa-pod.png" alt="" width={32} height={32} className="h-8 w-5 object-contain" />
      <span className="flex flex-col leading-none">
        <span className={`font-serif text-xl ${textColor}`}>Sard</span>
        <span className="font-sans text-[10px] tracking-[0.2em] text-brand-teal-dark">chocolate</span>
      </span>
    </span>
  );
}
