/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { getUserInformation } from "@/actions/user/getUserInformation";
import Link from "next/link";
import { Button } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";
import { User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { toast } from 'sonner';
import { Auth } from '@/helpers/auth';
import { Skeleton } from "./Skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { getUserProfilePicture } from "@/actions/upload/getUserProfilePicture";
import { useSignIn } from "@/hooks/useSignIn";

export function UserMenu() {
  const { userInfo, error, isLoading } = useSignIn();
  const { setUser, setUserProfilePicture } = useGlobalStore();

  useEffect(() => {
    if (userInfo !== undefined) {
      setUser(userInfo);
    }
  }, [userInfo])

  const signOutAction = () => {
    const auth = new Auth();
    auth.removeTokens();
    window.location.reload();
  }

  return (
    <>
      {
        isLoading
          ? <UserMenuSkeleton />
          : userInfo === undefined
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
                      {
                        userInfo.profilePicture !== undefined
                          ? <Avatar className="w-7 h-7">
                            <AvatarImage src={userInfo.profilePicture} />
                            <AvatarFallback>{userInfo.username.slice(0, 1)}</AvatarFallback>
                          </Avatar>
                          : <div className='bg-white rounded-full p-1'>
                            <User2 size={16} />
                          </div>
                      }
                      <div>
                        <span className='text-white text-sm max-w-[100px] truncate'>{userInfo?.username}</span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={'/reviews'}>
                        Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='block lg:hidden' asChild>
                      <Link href='/reviews'>
                        Criar Review
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='block lg:hidden' asChild>
                      <Link href='/recommendations'>
                        Recomendações
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOutAction}>
                      Desconectar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )
      }
    </>
  )
}

function UserMenuSkeleton() {
  return (
    <div className='w-fit h-fit flex justify-center items-center gap-2'>
      <div className="w-fit h-fit">
        <Skeleton className='w-7 h-7 rounded-full' />
      </div>
      <div className="w-full">
        <Skeleton className='w-20 h-5 rounded-lg' />
      </div>
    </div>
  )
}
