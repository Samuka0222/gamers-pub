import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/Sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Gamers Pub',
    default: 'Gamers Pub'
  },
  description: "Jogou aquele jogo brabo e quer dizer sua opinião para o mundo? Está em dúvida do que jogar? Acesse o Gamers' Pub e resolva todos os seus problemas! A comunidade Gamer feita por Gamers!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className, 'min-w-screen min-h-screen')}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
