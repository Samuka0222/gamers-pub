import { ChatbotMenu } from "./_components/ChatbotMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-full py-6 md:py-10 px-5 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
      <div className="w-full lg:w-[90%] xl:w-[70%] h-full flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="w-full lg:w-[15%] overflow-x-auto lg:overflow-hidden">
          <ChatbotMenu />
        </div>
        <div className="w-full lg:w-[85%] h-full">
          {children}
        </div>
      </div>
    </section>
  );
}
