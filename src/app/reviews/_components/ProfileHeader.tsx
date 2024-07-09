'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/dialog";
import { Button } from "@/components/Button";
import { EditProfileForm } from "./EditProfileForm";
import { User2Icon } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export function ProfileHeader() {
  const { user } = useUserStore();

  return (
    <div className="w-full h-20 flex items-center">
      <div className="w-full h-full items-center flex gap-2">
        <div className="h-full w-20 bg-gray-400 rounded-lg flex justify-center items-center">
          <User2Icon size={40} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <span className="text-base font-medium text-gray-600">{user.title}</span>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' className="text-base font-medium">Editar Perfil</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              <EditProfileForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}
