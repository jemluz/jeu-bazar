import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Bazar da Jeu",
  description: "Vitrine de produtos do Bazar da Jeu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Header maxWidthClass="max-w-7xl" />
        {children}
      </body>
    </html>
  );
}
