/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ButtonsMenu } from "./_components/ButtonsMenu";
import { RecommendationBotForm } from "./_components/RecommendationBotForm";
import { makeRefreshTokenValidation } from "@/actions/auth/makeRefreshTokenValidation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export default function Home() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<Boolean | undefined>(undefined);
  const signIn = useUserStore().signIn;

  useEffect(function () {
    const tokens = JSON.parse(localStorage.getItem('tokens')!);
    if (!tokens) {
      setIsUserAuthenticated(false);
    } else {
      const expiresIn = new Date(tokens.ExpiresIn)
      const currentTime = new Date();
      const isTokenValid = expiresIn > currentTime;
      if (isTokenValid) {
        setIsUserAuthenticated(true);
        signIn();
      } else {
        try {
          makeRefreshTokenValidation().then(() => setIsUserAuthenticated(true));
        } catch (error) {
          toast.error('Token inválido. Por favor, faça login novamente.');
          localStorage.removeItem('tokens');
          setIsUserAuthenticated(false);
        }
      }
    }
  }, []);

  return (
    <section className="w-full py-6 md:py-10 px-5 flex flex-col justify-center items-center">
      <Suspense fallback={<div className="min-w-full min-h-screen">
        <Loader2 className="animate-spin" />
      </div>}>
        {isUserAuthenticated === true
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
