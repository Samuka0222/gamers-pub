/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image";
import { CustomLink } from "./CustomLink";
import { Button } from './Button';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './AlertDialog';
import { UserMenu } from './UserMenu';
import { Skeleton } from './Skeleton';

export function HeaderMenu() {
  const { user } = useUserStore();
  const router = useRouter();

  return (
    <header
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
            Home
          </CustomLink>
          <CustomLink href="/recommendations" type="normal">
            Recomendações
          </CustomLink>
          {
            user !== undefined
              ? <>
                <CustomLink href="/reviews" type="normal">
                  Reviews
                </CustomLink>
              </>
              : <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='default'
                      className="bg-transparent text-gray-200 uppercase hover:border-b border-primary hover:text-primary transition-colors rounded-none px-0"
                    >
                      Reviews
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Quem é você? 🤔</AlertDialogTitle>
                      <AlertDialogDescription>
                        Para acessar a área de Reviews, você precisa estar logado. Faça o login e começe a fazer suas avaliações!
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className='hover:bg-red-600'>Não quero!</AlertDialogCancel>
                      <AlertDialogAction
                        className='bg-transparent border border-gray-200 hover:bg-slate-100 text-black'
                        onClick={() => router.push('/auth/sign-in')}
                      >
                        Entendi
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
          }
        </nav>
      </div>
      <div>
        <Suspense fallback={<UserMenuSkeleton />}>
          <UserMenu />
        </Suspense>
      </div>
    </header>
  )
}

function UserMenuSkeleton() {
  return (
    <Button type='button' variant='outline'>
      <div className='w-full flex justify-center items-center gap-2'>
        <Skeleton className='w-5 h-5 rounded-full' />
        <Skeleton className='w-full rounded-lg' />
      </div>
    </Button>
  )
}
