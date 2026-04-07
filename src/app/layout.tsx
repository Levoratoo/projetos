import "./globals.css";
import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import { withBasePath } from "@/lib/basePath";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display"
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Portfólio de Projetos",
  description:
    "Portfólio premium de projetos Printbag com foco em performance, design e resultados.",
  icons: {
    icon: [
      { url: withBasePath("/favicon.svg"), type: "image/svg+xml" },
    ],
    shortcut: withBasePath("/favicon.svg"),
    apple: withBasePath("/favicon.svg"),
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
      <body className="min-h-screen bg-[var(--bg-base)]">
        <div className="relative isolate min-h-screen overflow-hidden">
          <div className="ambient-backdrop pointer-events-none fixed inset-0 print:hidden" />
          <div className="relative z-10">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
