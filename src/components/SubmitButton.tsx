'use client'

import { Button } from './Button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='outline'
      disabled={pending}
      className={cn(
        className ?? 'rounded-full border-none h-10 w-10 p-0 flex justify-center items-center'
      )}
    >
      {
        pending
          ? <><Loader2 className='animate-spin' /></>
          : <>{children}</>
      }
    </Button>
  )
}
