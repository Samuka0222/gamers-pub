export default function HomePage() {
  return (
    <section className="w-full xl:w-[70%] h-full flex flex-col justify-center items-center px-5 py-6">
      <div className="w-full h-fit flex justify-center items-center">
        <h2 className="w-fit text-3xl font-bold text-slate-600">
          Bem-vindo ao
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-2">
            Gamers&apos; Pub!
          </span>
        </h2>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold">Reviews Populares</h3>
        <div>
          TODO: Colocar as reviews aqui.
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold text-center">Games jogados recentemente por nossos membros</h3>
        <div>
          TODO: Colocar as capas aqui.
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-10">
        <h3 className="text-xl font-semibold">Lançando em breve</h3>
        <div>
          TODO: Colocar as capas aqui.
        </div>
      </div>
    </section>
  )
}
