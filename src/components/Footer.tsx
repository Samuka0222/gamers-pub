'use client'

import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { CustomLink } from "./CustomLink";

export function Footer() {
  return (
    <footer className="w-full flex justify-center items-center gap-8 bg-slate-900 py-2">
      <span className='text-white w-fit whitespace-nowrap'>Criado por Samuel Machado</span>
      <ul className="w-fit flex gap-2 items-center justify-center">
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
    </footer>
  )
}
