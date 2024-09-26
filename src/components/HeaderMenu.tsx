/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Image from "next/image";
import { CustomLink } from "./CustomLink";
import { Button } from './Button';
import { useGlobalStore } from '@/store/globalStore';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './AlertDialog';
import { UserMenu } from './UserMenu';
import Link from "next/link";

export function HeaderMenu() {
  const { user } = useGlobalStore();
  const router = useRouter();

  return (
    <header
      className="w-full py-2 bg-slate-900 flex justify-between px-5 md:px-10 lg:px-0 lg:justify-center items-center gap-8 lg:gap-40 shadow-sm"
    >
      <div className='w-fit h-fit flex justify-center items-center'>
        <Link href="/" className="hover:scale-105 flex justify-center items-center transition-transform">
          <div className='w-[50px] h-[50px]'>
            <Image
              src='/logo-gamers-pub-sm.png'
              alt='Logo do Gamers pub'
              width={50}
              height={50}
            />
          </div>
          <span className="block lg:hidden uppercase text-xl text-white font-bold ml-1">Home</span>
        </Link>
      </div>
      <div className="hidden md:flex flex-col justify-center items-center">
        <nav className="w-fit flex flex-col md:flex-row justify-center items-center md:items-end gap-4 md:gap-8">
          <CustomLink href="/" type="normal">
            Home
          </CustomLink>
          {
            user !== undefined
              ? <>
                <CustomLink href="/recommendations" type="normal">
                  Recomendações
                </CustomLink>
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
                      Recomendações
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
        <UserMenu />
      </div>
    </header>
  )
}
