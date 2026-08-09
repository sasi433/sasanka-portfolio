import { profile } from "@/content/profile";

export const siteConfig = {
  name: profile.name,
  title: `${profile.name} | Senior Software Engineer`,
  description:
    "Senior Software Engineer focused on backend, Python, DevOps and cloud-native systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  isProduction: process.env.NEXT_PUBLIC_SITE_ENV === "production",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
