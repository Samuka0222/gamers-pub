'use client'

import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import { CustomLink } from "./CustomLink";
import Image from "next/image";

export function HeaderMenu() {
  return (
    <header className="w-full py-2 bg-slate-900 flex justify-around lg:justify-center items-center gap-8 lg:gap-40 shadow-sm">
      <div className='w-[120px] h-[120px]'>
        <Image
          src='/logo-gamers-pub.png'
          alt='Logo do Gamers pub'
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="hidden md:block text-white text-2xl uppercase tracking-wide font-bold">Gamers&apos; Pub</h1>
        <nav className="flex flex-col md:flex-row justify-center items-center md:items-end gap-4 md:gap-8 md:mt-6">
          <CustomLink href="/" type="normal">
            Recomendações
          </CustomLink>
          <CustomLink href="/reviews" type="normal">
            Reviews
          </CustomLink>
        </nav>
      </div>
      <div className='hidden md:block'>
        <div className="w-full flex flex-col gap-4">
          <span className='text-white w-full whitespace-nowrap'>Criado por Samuel Machado</span>
          <ul className="w-full flex gap-2 items-center justify-center">
            <li>
              <CustomLink href="https://github.com/Samuka0222" type="social">
                <Github />
              </CustomLink>
            </li>
            <li>
              <CustomLink href="https://www.linkedin.com/in/samuelmachado0222/" type="social">
                <Linkedin />
              </CustomLink>
            </li>
            <li>
              <CustomLink href="https://www.instagram.com/salvesamukaa/" type="social">
                <Instagram />
              </CustomLink>
            </li>
            <li>
              <CustomLink href="https://x.com/salvesamuka" type="social">
                <Twitter />
              </CustomLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
