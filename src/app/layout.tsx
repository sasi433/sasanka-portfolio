import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HeaderIdentityProvider } from "@/components/layout/header-identity-provider";
import { CloudflareAnalytics } from "@/components/analytics/cloudflare-analytics";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { SkipLink } from "@/components/ui/skip-link";
import { ThemeProvider } from "@/providers/theme-provider";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Sasanka Maddala | Senior Software Engineer",
    template: "%s | Sasanka Maddala",
  },
  description:
    "Senior Software Engineer focused on backend, Python, DevOps and cloud-native systems.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Sasanka Maddala",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: siteConfig.isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <PersonJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="sasanka-portfolio-theme"
          disableTransitionOnChange
        >
          <HeaderIdentityProvider>
            <SkipLink />
            <div className="site-atmosphere" aria-hidden="true" />
            <div className="relative z-10 flex min-h-screen flex-col">
              <SiteHeader />
              <main id="main-content" tabIndex={-1} className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
            <CloudflareAnalytics />
          </HeaderIdentityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
