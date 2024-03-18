"use client";
import { Popover } from "@headlessui/react";
import {
  Search,
  ShoppingBag,
  ArrowRightCircle,
  Loader2Icon,
  Sun,
  Moon,
  AlignLeft,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import ItemCart from "./ItemCart";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { spotlight } from "@mantine/spotlight";
import { useSession, signIn } from "next-auth/react";
import Logo from "./Logo";
import { links } from "@/Data";
import { useTheme } from "next-themes";
import useUpdateEmailSession from "@/lib/hooks/useUpdateEmailSession";
import UserPopover from "../(User)/layout/UserPopover";
import SearchDialog from "./SearchDialog";
import NotFound from "./NotFound";
import useCart from "@/lib/api/useCart";
import ModalNavbar from "./ModalNavbar";
import ThemeIcon from "./ThemeIcon";
import SearchIcon from "./SearchIcon";
import CartModal from "./CartModal";
type Props = {};

function Navbar({}: Props) {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const cart = useCart();
  const { scrollYProgress } = useScroll();
  const [topScreen, setTopScreen] = useState<boolean>(true);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const circfrn = 2 * Math.PI * 20;
  const circle = useRef<SVGCircleElement>(null);
  const [scrollProgress, setScrollProgress] = useState<string>(`${circfrn}`);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const prev = scrollYProgress.getPrevious();
    latest > 0 ? setTopScreen(false) : setTopScreen(true);
    latest <= prev && latest > 0.15 ? setShowBtn(true) : setShowBtn(false);
    setScrollProgress(`${circfrn - circfrn * latest}px`);
  });
  const [hovered, setHovered] = useState(pathname);
  const [darkMode, setDarkMode] = useState<boolean>(
    typeof window != "undefined" &&
      window.localStorage.getItem("theme") === "dark"
      ? true
      : false
  );
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [cartModal, setCartModal] = useState(false);
  if (darkMode && typeof document != "undefined") {
    setTheme("dark");
    document
      .querySelector("html")
      ?.setAttribute("data-mantine-color-scheme", "dark");
  } else if (typeof document != "undefined") {
    setTheme("light");
    document
      .querySelector("html")
      ?.setAttribute("data-mantine-color-scheme", "light");
  }
  useUpdateEmailSession();
  return (
    <>
      <nav
        className={`hidden xl:flex w-full items-center justify-between px-12 z-40 sticky top-0 py-4 ${
          !topScreen
            ? "bg-slate-50/75 dark:bg-stone-800/75 backdrop-blur-xl"
            : ""
        }`}
      >
        <Logo color={topScreen ? "text-main transition" : undefined} />
        <div className='flex gap-10 pt-3'>
          {links.map((link, i) => {
            const isActive = link.href === pathname;
            return (
              <Link
                key={i}
                href={link.href}
                className={`navlink font-bold transition relative duration-150 px-3 py-2 hover:text-main ${
                  isActive ? "text-main" : "text-lighterText"
                }`}
                onMouseOver={() => setHovered(link.href)}
                data-active={isActive}
                onMouseLeave={() => setHovered(pathname)}
              >
                <span>{link.title}</span>
                {link.href === hovered && (
                  <motion.div
                    className='absolute bottom-0 left-0 w-full h-full bg-main/25 rounded-md -z-10'
                    layoutId='navbar'
                    aria-hidden='true'
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            );
          })}
          <SearchIcon topScreen={topScreen} />
          <ThemeIcon
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            topScreen={topScreen}
          />
        </div>
        <div
          className={`flex items-center ${
            session?.user ? "gap-10 ml-10 translate-y-2 " : "gap-3 pt-3"
          }`}
        >
          <div
            className='relative cursor-pointer'
            onClick={() => {
              setCartModal(true);
            }}
          >
            {cart.data && cart.data.length > 0 && (
              <span
                className={`absolute top-0 right-0 w-3 h-3 rounded-full bg-main text-[0.5rem] pl-[0.02rem] pt-[0.1rem] text-header flex items-center justify-center`}
              >
                {cart.data.length}
              </span>
            )}
            <ShoppingBag
              className={`font-bold transition duration-150 ${
                cartModal ? "text-main " : "text-lighterText hover:text-main "
              } `}
            />
          </div>
          {status === "authenticated" ? (
            <>
              <UserPopover />
            </>
          ) : status === "unauthenticated" ? (
            <>
              <button
                onClick={() => signIn()}
                className='text-main font-bold px-3 py-2 rounded-2xl transition duration-150 border border-transparent hover:!border-main'
              >
                تسجيل الدخول
              </button>
              <Link
                href={`/register`}
                className={`${
                  topScreen ? "text-stone-900" : "text-slate-50"
                } dark:text-stone-900 dark:hover:text-main font-bold bg-main px-3 py-2 rounded-2xl  transition duration-150 hover:bg-transparent hover:text-main`}
              >
                إنشاء حساب جديد
              </Link>
            </>
          ) : (
            <>
              <Loader2Icon className='animate-spin text-main' />
            </>
          )}
        </div>
      </nav>
      <nav
        className={`sticky xl:hidden z-40 top-0 w-full flex items-center justify-between px-6 py-5 ${
          !topScreen
            ? "bg-slate-50/75 dark:bg-stone-800/75 backdrop-blur-xl"
            : ""
        }`}
      >
        <Logo
          color={topScreen ? "text-main transition" : undefined}
          iconColor={`${
            !topScreen ? "text-stone-600 dark:text-main" : "text-main"
          }`}
          fontSize='text-2xl'
          iconSize='24'
        />
        <div className='flex items-center justify-center gap-8'>
          <SearchIcon topScreen={topScreen} mobile={true} />
          <ThemeIcon
            mobile={true}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            topScreen={topScreen}
          />
          <AlignLeft
            onClick={() => setIsOpen(true)}
            className={`cursor-pointer ${
              !topScreen ? "text-stone-600 dark:text-main" : "text-main"
            }`}
          />
        </div>
        <AnimatePresence mode='wait'>
          {isOpen && <ModalNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
        </AnimatePresence>
      </nav>
      <AnimatePresence mode='wait'>
        {showBtn && (
          <motion.button
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
            initial={{ scale: 0.5, rotate: "-90deg", opacity: 0 }}
            animate={{
              scale: 1,
              rotate: "-90deg",
              opacity: 1,
              transition: { damping: 200, stiffness: 3 },
            }}
            exit={{
              scale: 0.5,
              rotate: "-90deg",
              opacity: 0,
              transition: { damping: 200, stiffness: 3 },
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title='scroll to top button'
            className='fixed bottom-5 left-5 w-[50px] h-[50px] -rotate-90 z-30 rounded-full bg-main/25 backdrop-blur-sm'
          >
            <svg width={50} height={50}>
              <motion.circle
                animate={{ strokeDashoffset: scrollProgress }}
                cx={25}
                cy={25}
                ref={circle}
                r={20}
                className='fill-none stroke-main stroke-2'
                style={{ strokeDasharray: `${2 * Math.PI * 20}px` }}
              />
            </svg>
            <ArrowRightCircle className='fill-main text-slate-50 dark:text-stone-800 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
          </motion.button>
        )}
      </AnimatePresence>
      <SearchDialog />
      <AnimatePresence mode='wait'>
        {cartModal && <CartModal isOpen={cartModal} setIsOpen={setCartModal} />}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
