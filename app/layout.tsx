import 'core-js/stable';
import 'regenerator-runtime/runtime';

import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/retroui/Sonner";
import { LanguageProvider } from "@/lib/i18n/context";
import "./globals.css"; // tailwind v4 main css

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "DIAGRAM",
  description: "A Digital Ecosystem for Agroforestry Management",
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* === LEGACY CSS FALLBACK === */}
        <Script id="legacy-css-loader" strategy="beforeInteractive">
          {`
            try {
              var m = navigator.userAgent.match(/Chrome\\/([0-9]+)/);
              if (m && parseInt(m[1]) < 100) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/globals-legacy.css';
                document.head.appendChild(link);
              }
            } catch (e) {}
          `}
        </Script>
      </head>

      <body className={`${plusJakarta.variable}`}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
