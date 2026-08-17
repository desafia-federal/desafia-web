import Image from "next/image";
import Link from "next/link";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${footer ? "logo--footer" : ""}`}
      aria-label="DESAFÍA Federal, ir al inicio"
    >
      <Image
        className="logo__image"
        src="/brand/desafia-logo-horizontal.webp"
        width={720}
        height={246}
        sizes="(max-width: 640px) 172px, 222px"
        alt="DESAFÍA Federal"
        priority={!footer}
      />
    </Link>
  );
}
