import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DESAFÍA Federal",
    short_name: "DESAFÍA",
    description: "Afrontar y transformar la exclusión.",
    start_url: "/",
    display: "standalone",
    background_color: "#feefd5",
    theme_color: "#032545",
    lang: "es-AR",
    icons: [
      { src: "/brand/desafia-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/desafia-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
