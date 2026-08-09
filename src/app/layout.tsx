import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/ui/skip-link";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sasanka Maddala | Senior Software Engineer",
    template: "%s | Sasanka Maddala",
  },
  description:
    "Senior Software Engineer focused on backend, Python, DevOps and cloud-native systems.",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="sasanka-portfolio-theme"
          disableTransitionOnChange
        >
          <SkipLink />
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" tabIndex={-1} className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
