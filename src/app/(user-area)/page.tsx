/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ButtonsMenu } from "./_components/ButtonsMenu";
import { RecommendationBotForm } from "./_components/RecommendationBotForm";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const { user } = useUserStore();

  return (
    <section className="w-full py-6 md:py-10 px-5 flex flex-col justify-center items-center">
      <Suspense fallback={<div className="min-w-full min-h-screen">
        <Loader2 className="animate-spin" />
      </div>}>
        {user?.isAuthenticated === true
          ? <>
            <h2 className="font-semibold text-xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
            <div className="w-full md:w-[80%] xl:w-[60%] h-full mt-2 md:mt-0">
              <ButtonsMenu />
              <RecommendationBotForm />
            </div>
          </>
          : <>
            <h2 className="font-semibold text-xl text-center w-[80%] md:w-full">Precisa de alguma dica para escolher seu próximo jogo?</h2>
            <div className="w-full md:w-[80%] xl:w-[60%] h-full mt-2 md:mt-0">
              <ButtonsMenu />
              <RecommendationBotForm />
            </div>
          </>
        }
      </Suspense>
    </section>
  )
}
