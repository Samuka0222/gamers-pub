/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { makeRefreshTokenValidation } from '@/actions/auth/makeRefreshTokenValidation';
import Link from "next/link";
import { Button } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { toast } from 'sonner';

export function UserMenu() {
  const { user, signIn } = useUserStore();

  useEffect(() => {
    if (user === undefined) {
      const tokens = JSON.parse(localStorage.getItem('tokens')!);
      if (!tokens) {
        return user;
      } else {
        const expiresIn = new Date(tokens.ExpiresIn)
        const currentTime = new Date();
        const isTokenValid = expiresIn > currentTime;
        if (isTokenValid) {
          if (user === undefined) {
            signIn(tokens.AccessToken);
          } else {
            try {
              makeRefreshTokenValidation().then(() => {
                const newTokens = JSON.parse(localStorage.getItem('tokens')!);
                signIn(newTokens.AccessToken);
              });
            } catch (error) {
              toast.error('Sessão expirada! Por favor, faça login novamente.');
              localStorage.removeItem('tokens');
              return user;
            }
          }
        }
      }
    }
  }, []);

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
