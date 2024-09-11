import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Autenticação',
  description: "Novo por aqui? Faça seu cadastro e se junte ao Gamers' Pub! Já é membro? Então faça seu login e continue fazendo suas reviews.",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-screen min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
