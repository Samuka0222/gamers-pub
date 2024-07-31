import "./globals.css";
import { HeaderMenu } from "@/components/HeaderMenu";
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
  description: "Com dúvidas de qual jogo jogar? Acesse nosso chatbot de recomendação de jogos e monte uma lista de games para você jogar!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={cn(inter.className)}>
        <main className="min-w-screen min-h-screen overflow-y-auto">
          <HeaderMenu />
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
