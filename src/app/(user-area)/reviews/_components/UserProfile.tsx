'use client'

import { useUserStore } from "@/store/userStore";
import { User2Icon } from "lucide-react";

export function UserProfile() {
  const { user } = useUserStore();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div className="w-28 h-28 bg-gray-400 rounded-lg flex justify-center items-center">
        <User2Icon size={40} />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-white">{user?.username}</h2>
      </div>
    </div>
  )
}
