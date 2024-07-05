import { Button } from "./Button";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  type: 'social' | 'normal'
}

export function CustomLink({ href, children, type = 'normal' }: CustomLinkProps) {
  return (
    <Button
      variant='default'
      size={type === 'social' ? 'icon' : 'default'}
      asChild
      className={cn(
        type === 'social'
          ? 'bg-transparent text-primary uppercase rounded-none px-0 hover:text-secondary transition-colors p-0'
          : "bg-transparent text-gray-200 uppercase hover:border-b border-primary hover:text-primary transition-colors rounded-none px-0"
      )}
    >
      <Link href={href} target={type === "social" ? '_blank' : '_self'}>
        {children}
      </Link>
    </Button>
  )
}
