/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getUserInformation } from "@/actions/user/getUserInformation";
import Link from "next/link";
import { Button } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { toast } from 'sonner';
import { Auth } from '@/helpers/auth';

export function UserMenu() {
  const { setUser } = useGlobalStore();
  const user = useGlobalStore.getState().user;

  useEffect(() => {
    const handleSignIn = async () => {
      const auth = new Auth();
      const tokens = auth.getUserTokens();
      if (!tokens) {
        return user;
      } else {
        const isTokenValid = auth.validateTokens();
        if (isTokenValid) {
          const userInfo = (await getUserInformation(tokens.AccessToken)).data ?? user;
          setUser(userInfo);
        } else {
          try {
            await auth.validateWithRefreshToken();
            const newTokens = JSON.parse(localStorage.getItem("tokens")!);
            const userInfo = (await getUserInformation(newTokens.AccessToken)).data ?? user;
            setUser(userInfo)
          } catch (error) {
            toast.error('Sessão expirada! Por favor, faça login novamente.');
            localStorage.removeItem('tokens');
            return user;
          }
        }
      }
    }
    if (user === undefined) {
      handleSignIn();
    }
  }, [setUser]);

  return (
    <>
      {
        !user?.isAuthenticated
          ? (
            <Button
              className='bg-transparent hover:bg-slate-700 text-base'
              asChild
            >
              <Link href='/auth/sign-in'>
                Entrar / Cadastro
              </Link>
            </Button>
          )
          : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className='bg-slate-900 border border-primary py-2 px-3 rounded-lg'>
                  <div className='w-full h-full flex justify-center items-center gap-2'>
                    <div className='bg-white rounded-full p-1'>
                      <User2 size={16} />
                    </div>
                    <div>
                      <span className='text-white text-sm'>{user?.username}</span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem className='block lg:hidden'>Criar Review</DropdownMenuItem>
                  <DropdownMenuItem className='block lg:hidden'>Recomendações</DropdownMenuItem>
                  <DropdownMenuItem>Configurações</DropdownMenuItem>
                  <DropdownMenuItem>Feedback</DropdownMenuItem>
                  <DropdownMenuItem>Desconectar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )
      }
    </>
  )
}
