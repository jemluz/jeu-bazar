import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
