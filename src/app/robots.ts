import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return siteConfig.isProduction
    ? {
        rules: {
          userAgent: "*",
          allow: "/",
          disallow: ["/contact/sent", "/api/"],
        },
        sitemap: absoluteUrl("/sitemap.xml"),
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
