'use client' // Error components must be Client Components

import { Button } from '@/components/Button'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='w-full min-h-screen flex flex-col flex-1 justify-center items-center gap-4'>
      <div className='w-full h-fit flex flex-col justify-center items-center gap-4'>
        <h2 className='text-4xl text-red-500 font-bold'>DEU RUIM!</h2>
        <h3 className='text-2xl text-red-400 font-semibold'>Parece que temos um problema :/</h3>
        <p className='text-lg font-medium text-center'>Ocorreu um erro na página que você tentou acessar, deseja tentar novamente ou voltar para a página inicial?</p>
      </div>
      <div className='w-[300px] flex flex-col md:flex-row gap-4'>
        <Button
          variant='outline'
          onClick={
            () => reset()
          }
        >
          Tentar novamente
        </Button>
        <Button
          variant='outline'
          asChild
        >
          <Link href='/'>
            Voltar para o Início <Home className='ml-1' />
          </Link>
        </Button>
      </div>
    </div>
  )
}
