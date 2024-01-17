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
    const page = pathname
    const UniqueDesignPages = ['/register', '/login', '/admin/']
    if(UniqueDesignPages.find((page)=>pathname.startsWith(page))){
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