'use client'

import { Button } from "@/components/Button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function ButtonsMenu() {
  const router = useRouter();
  const clickAction = () => {
    router.push('/recommendations')
  }

  return (
    <nav className="w-full flex justify-end mb-1">
      <Button
        variant='ghost'
        size='sm'
        className="text-gray-500"
        onClick={clickAction}
      >
        <PlusCircle className="mr-2" />
        Novo Chat
      </Button>
    </nav>
  )
}
