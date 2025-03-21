import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LayoutComponent } from "@/components/layout";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard 3° Milenio | Painel de Controle",
  description: "Uma história de grandes resultados!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <LayoutComponent>{children}</LayoutComponent>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
