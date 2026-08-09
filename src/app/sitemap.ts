import type { MetadataRoute } from "next";
import { workItems } from "@/content/work";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/experience",
    "/work",
    "/skills",
    "/contact",
    "/privacy",
  ];
  return [...routes, ...workItems.map((item) => `/work/${item.slug}`)].map(
    (route) => ({
      url: absoluteUrl(route),
      changeFrequency: route === "/" ? "monthly" : "yearly",
      priority: route === "/" ? 1 : route === "/work" ? 0.9 : 0.7,
    }),
  );
}
