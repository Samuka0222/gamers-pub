import { ButtonsMenu } from "./_components/ButtonsMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-full py-6 md:py-10 px-5 flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
      <div className="w-full h-full mt-2 md:mt-0">
        <ButtonsMenu />
        {children}
      </div>
    </section>
  );
}
