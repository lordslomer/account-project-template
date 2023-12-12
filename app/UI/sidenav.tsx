"use client"
import { ArrowLeftOnRectangleIcon, HomeIcon, PhotoIcon, UserIcon } from "@heroicons/react/24/outline";
import { logout } from "../lib/actions";
import { Button, c } from "./button";
import Link from 'next/link';
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { name: 'Main', href: '/main', icon: HomeIcon },
  { name: 'Account', href: '/main/account', icon: UserIcon }
]

export default function SideNav({ verified }: { verified: boolean }) {
  const path = usePathname();
  const userNotVerifiedStyle = { 'cursor-not-allowed': !verified }
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

      {/* Logo */}
      <Link className={clsx(`
      h-20 md:h-40 mb-4
      md:flex hidden items-center justify-center 
      bg-1 rounded-md shadow-md 
      transition-colors hover:bg-bg-2
      `, userNotVerifiedStyle
      )}
        href="/main">
        <div className="w-32 text-white md:w-40">
          <div className={'flex flex-row items-center leading-none text-white space-x-4'}>
            <PhotoIcon className="h-12 w-12" />
            <p className="text-[44px]">App</p>
          </div>
        </div>
      </Link>


      <div className="
      flex flex-row md:flex-col justify-between 
      grow space-x-2  md:space-x-0 md:space-y-2">

        {links.map((link) => (
          <Link key={link.name} href={link.href} className={clsx(`
          flex md:flex-none items-center md:justify-start justify-center
          grow h-[48px] gap-2 p-3 md:p-2 md:px-3
          bg-1 rounded-md hover:bg-bg-2
          transition-colors 
          `, { 'bg-4': path === link.href, }, userNotVerifiedStyle
          )}>
            <link.icon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        ))}

        <div className="hidden md:block grow h-auto w-full rounded-md bg-1"></div>

        <form action={logout} className="flex justify-center">
          <Button variant={c.RED} className="
          md:flex-none max-md:h-auto
          ">
            <ArrowLeftOnRectangleIcon className="h8 w-8" />
            <p className="hidden md:block">logout</p>
          </Button>
        </form>
      </div>
    </div>
  )
}