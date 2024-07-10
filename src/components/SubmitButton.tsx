'use client'

import { Button } from './Button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  size?: 'icon' | 'normal';
}

export function SubmitButton({ children, size = 'icon' }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='outline'
      disabled={pending}
      size={size === 'normal' ? 'default' : 'icon'}
      className={cn(
        size === 'normal'
          ? 'border-none flex justify-center items-center text-black font-semibold'
          : 'rounded-full border-none h-10 w-10 p-0 flex justify-center items-center'
      )}
    >
      {
        pending
          ? <><Loader2 className='animate-spin w-[3.55rem]' /></>
          : <>{children}</>
      }
    </Button>
  )
}
