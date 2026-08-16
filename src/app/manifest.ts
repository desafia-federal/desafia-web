import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DESAFÍA Federal",
    short_name: "DESAFÍA",
    description: "Afrontar y transformar la exclusión.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf9",
    theme_color: "#17151b",
    lang: "es-AR",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
