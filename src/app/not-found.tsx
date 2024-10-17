import { Button } from '@/components/Button'
import { Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='min-w-full min-h-screen flex flex-col justify-center items-center flex-1 gap-3'>
      <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8">ERROR 404</h1>
      <h2 className='text-3xl font-semibold text-zinc-800'>Se perdeu?</h2>
      <p className='text-lg text-center font-medium'>Parece que o que você deseja encontrar, na verdade não existe :/</p>
      <Button
        variant='outline'
        asChild
      >
        <Link href='/' className='font-medium'>
          Voltar para o Início <Home className='ml-1' />
        </Link>
      </Button>
    </div>
  )
}
