import Link from "next/link";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      className={`logo ${footer ? "logo--footer" : ""}`}
      aria-label="DESAFÍA Federal, ir al inicio"
    >
      <span className="logo__word">DESAFÍA</span>
      <span className="logo__federal">Federal</span>
    </Link>
  );
}
