"use client";
import { usePathname } from "next/navigation";
import { FaTimes, FaBars } from "react-icons/fa"
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname: string = usePathname();
  
  const toggleNavMenu = () => { 
    setIsOpen(prev => !prev)
  };

  return (
    <div className="w-full flex justify-end">
      <button
        onClick={toggleNavMenu}
        className="xl:hidden text-2xl"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes/> : <FaBars />}
      </button>

      <nav className="xl:w-4/6 flex items-center">
        <div className="hidden xl:flex justify-around w-full">
          <Link
            href="/"
            className={`text-xl ${pathname === "/" ? "font-bold" : ""}`}
          >
            Startsida
          </Link>
          <Link
            href="/teknikprogramen"
            className={`text-xl ${pathname === "/teknikprogramen" ? "font-bold" : ""}`}
          >
            Teknikprogramen
          </Link>
          <Link
            href="/estetprogramen"
            className={`text-xl ${pathname === "/estetprogramen" ? "font-bold" : ""}`}
          >
            Estetprogramen
          </Link>
          <Link
            href="/projektveckorna"
            className={`text-xl ${pathname === "/projektveckorna" ? "font-bold" : ""}`}
          >
            Projektveckorna
          </Link>
        </div>

        {isOpen && (
          <div className={`absolute right-0 top-32 h-screen w-1/2 bg-navbar flex flex-col items-center xl:hidden`}>
            <Link
              href="/"
              className={`text-2xl p-4 ${pathname === "/" ? "font-bold" : ""}`} 
              onClick={() => setIsOpen(false)}
            >
              Startsida
            </Link>
            <Link
              href="/teknikprogramen"
              className={`text-2xl p-4 ${pathname === "/teknikprogramen" ? "font-bold" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Teknikprogramen
            </Link>
            <Link
              href="/estetprogramen"
              className={`text-2xl p-4 ${pathname === "/estetprogramen" ? "font-bold" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Estetprogramen
            </Link>
            <Link
              href="/projektveckorna"
              className={`text-2xl p-4 ${pathname === "/projektveckorna" ? "font-bold" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Projektveckorna
            </Link>
          </div>
        )}

      </nav>
    </div>
  );
}