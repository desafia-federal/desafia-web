import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DESAFÍA Federal | Comunicación, inclusión y autonomía",
    template: "%s | DESAFÍA Federal",
  },
  description:
    "Una asociación civil en formación desde Córdoba para afrontar y transformar la exclusión que producen las barreras para comunicarse.",
  keywords: [
    "discapacidad",
    "comunicación",
    "accesibilidad comunicacional",
    "comunicación aumentativa y alternativa",
    "CAA",
    "inclusión",
    "Argentina",
    "Córdoba",
  ],
  openGraph: {
    title: "DESAFÍA Federal",
    description: "Afrontar y transformar la exclusión.",
    locale: "es_AR",
    type: "website",
    siteName: "DESAFÍA Federal",
  },
  twitter: {
    card: "summary_large_image",
    title: "DESAFÍA Federal",
    description: "Afrontar y transformar la exclusión.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17151b",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido-principal">
          Ir al contenido principal
        </a>
        <Header />
        <main id="contenido-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
