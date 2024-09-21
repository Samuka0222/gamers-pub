'use client'

import { User2Icon } from "lucide-react";
import { useGlobalStore } from "@/store/globalStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Dialog";
import { EditUserInfoForm } from "./EditUserInfoForm";
import Image from "next/image";


export function ProfileHeader() {
  const { user } = useGlobalStore();

  return (
    <div className="w-full h-[100px] flex justify-between items-center">
      <div className="w-full h-full items-center flex gap-2">
        {
          user?.profilePicture
            ? <Image src={user.profilePicture} alt="Sua foto de perfil" width={96} height={96} className="rounded-lg" />
            : <div className="h-full w-24 bg-gray-400 rounded-lg flex justify-center items-center">
              <User2Icon size={40} />
            </div>
        }
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{user?.username}</h2>
          <span className="text-base font-medium text-gray-600">
            {
              user?.title ? user.title : "Novato do Gamers' Pub"
            }
          </span>
        </div>
      </div>
      <Dialog>
        <DialogTrigger className="w-[200px] py-2 border rounded-lg hover:bg-gray-200">Editar perfil</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar informações do seu perfil</DialogTitle>
            <EditUserInfoForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
