'use client'

import { motion } from 'framer-motion'
import Link from 'next/link';
import Image from "next/image";
import { CustomLink } from "./CustomLink";
import { Button } from './Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './DropdownMenu';
import { useUserStore } from '@/store/userStore';
import { User2 } from 'lucide-react';
// import { Suspense, useState } from 'react';
import { toast } from 'sonner';
import { makeRefreshTokenValidation } from '@/actions/auth/makeRefreshTokenValidation';
import { useEffect } from 'react';

export function HeaderMenu() {
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
  });

  return (
    <motion.header
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ type: 'ease', repeat: 0 }}
      className="w-full py-2 bg-slate-900 flex justify-around lg:justify-center items-center gap-8 lg:gap-40 shadow-sm"
    >
      <div className='w-fit h-fit flex justify-center items-center'>
        <div className='w-[110px] h-[110px]'>
          <Image
            src='/logo-gamers-pub.png'
            alt='Logo do Gamers pub'
            width={140}
            height={140}
          />
        </div>
        <h1 className="hidden md:block text-white text-2xl uppercase tracking-wide font-bold">Gamers&apos; Pub</h1>
      </div>
      <div className="hidden lg:flex flex-col justify-center items-center">
        <nav className="flex flex-col md:flex-row justify-center items-center md:items-end gap-4 md:gap-8">
          <CustomLink href="/" type="normal">
            Recomendações
          </CustomLink>
          <CustomLink href="/reviews" type="normal">
            Reviews
          </CustomLink>
        </nav>
      </div>
      <div>
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
      </div>
    </motion.header>
  )
}
