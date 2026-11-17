import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/blog";
import { POLICIES } from "@/lib/policies";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = siteUrl();
  return [
    { url: `${u}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${u}/shop`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${u}/collection`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${u}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({ url: `${u}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: `${u}/faq`, changeFrequency: "monthly", priority: 0.6 },
    ...POLICIES.map((p) => ({ url: `${u}/policies/${p.slug}`, lastModified: p.updated, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
