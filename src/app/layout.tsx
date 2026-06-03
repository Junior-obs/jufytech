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
  title: "JufyTech | Solutions Digitales Premium",
  description:
    "JufyTech — Développement web premium, applications modernes et expériences digitales immersives.",
  keywords: [
    "JufyTech",
    "développement web",
    "creative developer",
    "react",
    "next.js",
    "portfolio",
    "web development",
  ],
  openGraph: {
    title: "JufyTech | Solutions Digitales Premium",
    description:
      "Des solutions digitales premium pour les entreprises modernes.",
    type: "website",
  },
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
