import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl()}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl()}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl()}/collection`, changeFrequency: "weekly", priority: 0.9 },
  ];
}
