import type { MetadataRoute } from "next";
import { stories } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pages = [
    "",
    "/nosotros",
    "/participar",
    "/recursos",
    "/historias",
    "/transparencia",
    "/donar",
    "/contacto",
    "/accesibilidad",
  ];

  return [
    ...pages.map((path) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const })),
    ...stories.map((story) => ({
      url: `${baseUrl}/historias/${story.slug}`,
      changeFrequency: "yearly" as const,
      lastModified: new Date("2026-08-16"),
    })),
  ];
}
