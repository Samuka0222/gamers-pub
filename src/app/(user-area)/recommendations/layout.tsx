import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Recomendações',
  description: "Com dúvidas de qual jogo jogar? Acesse nosso chatbot de recomendação de jogos e monte uma lista de games para você jogar!",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full min-h-full py-6 md:py-10 px-5 flex flex-1 gap-4 justify-center items-center">
      <div className="w-full min-h-full flex flex-col flex-1 justify-center items-center">
        {children}
      </div>
    </section>
  );
}
