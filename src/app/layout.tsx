import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JufyTech | Solutions Digitales Premium",
    template: "%s | JufyTech",
  },
  description:
    "JufyTech — Développement web premium, applications modernes et expériences digitales immersives. Basé à Dakar, Sénégal.",
  keywords: [
    "JufyTech",
    "développement web",
    "creative developer",
    "react",
    "next.js",
    "portfolio",
    "web development",
    "Dakar",
    "Sénégal",
  ],
  authors: [{ name: "JufyTech" }],
  creator: "JufyTech",
  publisher: "JufyTech",
  metadataBase: new URL("https://jufytech.vercel.app"),
  openGraph: {
    title: "JufyTech | Solutions Digitales Premium",
    description:
      "Des solutions digitales premium pour les entreprises modernes. Développement web, design et expériences immersives.",
    url: "https://jufytech.vercel.app",
    siteName: "JufyTech",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "JufyTech — Solutions Digitales Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JufyTech | Solutions Digitales Premium",
    description:
      "Des solutions digitales premium pour les entreprises modernes.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "JufyTech",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  applicationName: "JufyTech",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${orbitron.variable} ${inter.variable} dark`}
    >
      <body className="min-h-screen antialiased">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
