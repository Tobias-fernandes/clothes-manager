import { ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { cn } from "@/shared/lib/classMerge";
import "./globals.css";
import ThemeLayout from "@/components/layout/themeLayout";
import ToasterLayout from "@/components/layout/toasterLayout";
import CookieConsentLayout from "@/components/layout/cookieConsentLayout";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Clothes Manager",
  description:
    "Um sistema de gerenciamento de lojas de roupas, criado para facilitar o controle de estoque, vendas e clientes, proporcionando uma experiência eficiente e intuitiva para os usuários.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("font-sans", outfit.variable)}
    >
      <head />
      <body className="antialiased">
        <ThemeLayout>
          <ToasterLayout>
            <CookieConsentLayout>{children}</CookieConsentLayout>
          </ToasterLayout>
        </ThemeLayout>
      </body>
    </html>
  );
}
