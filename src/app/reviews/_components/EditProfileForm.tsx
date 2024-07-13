'use client'

import { Input } from "@/components/Input";
import { SubmitButton } from "@/components/SubmitButton";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

export function EditProfileForm() {
  const { user, editUser } = useUserStore();

  const [userInput, setUserInput] = useState(user.username);
  const [titleInput, setTitleInput] = useState(user.title);


  const submitAction = () => {
    editUser({
      username: userInput,
      title: titleInput,
    })

  }

  return (
    <form action={submitAction} className="w-full flex flex-col justify-center items-center gap-4 mt-4">
      <div className="w-full flex flex-col gap-2">
        <label className="font-medium text-black text-base">Usuário:</label>
        <Input
          className="text-black "
          placeholder="Digite seu usuário."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="font-medium text-black text-base">Título:</label>
        <Input
          className="text-black"
          placeholder="Defina seu título..."
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      <SubmitButton className="w-[200px] bg-secondary hover:bg-secondary border-none text-white font-semibold mt-10 text-lg">
        Finalizar
      </SubmitButton>
    </form>
  )
}
