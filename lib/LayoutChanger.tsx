"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export function LayoutChanger ({ children }: Props) {
    const pathname = usePathname()
    const page = pathname.slice(pathname.lastIndexOf('/')+1)
    const UniqueDesignPages = ['register', 'login']
    if(UniqueDesignPages.includes(page)){
        return <>
        {children}
        </>
    }
  return <>
    <Navbar/>
    {children}
    <Footer/>
  </>;
};