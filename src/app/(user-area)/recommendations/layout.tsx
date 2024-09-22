import { ChatbotMenu } from "./_components/ChatbotMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full min-h-full flex-1 py-6 md:py-10 px-5 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
      <div className="w-full lg:w-[90%] xl:w-[70%] min-h-full flex-1 flex flex-col lg:flex-row justify-center items-start gap-4">
        <div className="w-full lg:w-[15%]">
          <ChatbotMenu />
        </div>
        <div className="w-full lg:w-[85%] min-h-full flex-1 justify-center items-center xl:mt-6">
          {children}
        </div>
      </div>
    </section>
  );
}
