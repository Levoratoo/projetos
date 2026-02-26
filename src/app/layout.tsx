import "./globals.css";
import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Providers } from "@/app/providers";

const display = Sora({ subsets: ["latin"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Portfólio de Projetos",
  description:
    "Portfólio premium de projetos Printbag com foco em performance, design e resultados.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
  openGraph: {
    title: "Portfólio de Projetos",
    description:
      "Portfólio premium de projetos Printbag com foco em performance, design e resultados.",
    type: "website"
  },
  metadataBase: new URL("https://printbag.local")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-[#0b0f0e]">
        <div className="relative min-h-screen">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(166,255,179,0.12),_transparent_55%),radial-gradient(circle_at_20%_80%,_rgba(255,255,255,0.08),_transparent_60%)]" />
          <Providers>{children}</Providers>
          <Footer />
        </div>
      </body>
    </html>
  );
}
