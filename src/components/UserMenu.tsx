/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import Link from "next/link";
import { Button } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { Auth } from '@/helpers/auth';
import { Skeleton } from "./Skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { useSignIn } from "@/hooks/useSignIn";
import { toast } from "sonner";
import { useGetProfilePicture } from "@/hooks/useGetProfilePicture";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const { setUser, setUserProfilePicture } = useGlobalStore();
  const { userInfo, error, isLoading } = useSignIn();
  const { profilePictureUrl, isLoading: IsProfileLoading } = useGetProfilePicture();

  const router = useRouter();

  useEffect(() => {
    if (error) toast.error('Sessão não autenticada, efetue o Login');
    console.log(error);
    router.push('/');
  }, [error]);

  useEffect(() => {
    if (userInfo !== undefined) {
      setUser(userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (profilePictureUrl !== undefined) {
      setUserProfilePicture(profilePictureUrl);
    }
  }, [profilePictureUrl])

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
                        !IsProfileLoading
                          ? <Avatar className="w-7 h-7">
                            <AvatarImage src={profilePictureUrl} />
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
