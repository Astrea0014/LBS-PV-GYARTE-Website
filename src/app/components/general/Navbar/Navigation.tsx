"use client";
import { usePathname } from "next/navigation";
import { FaTimes, FaBars } from "react-icons/fa"
import { useState } from "react";
import LinkHeader from "./LinkHeader";
import Link from "next/link";

export default function Navigation() {

  const pathname: string = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const toggleNavMenu = () => {
    if (isOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 500);
    } else {
      setIsOpen(true);
    }
  };
  
  return (
    <div className="w-full flex justify-end">
      {/* Hamburgarmeny-knappen */}
      <button
        onClick={toggleNavMenu}
        className="xl:hidden text-4xl"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes/> : <FaBars />}
      </button>

      <nav className="xl:w-4/6 flex items-center">
        {/* Laptop */}
        <div className="hidden xl:flex justify-around w-5/6">
          <Link
            href="/"
            className={`text-xl ${pathname === "/" ? "font-bold" : ""}`}
          >
            Startsida
          </Link>
          <Link
            href="/teknikprogrammen"
            className={`text-xl ${pathname === "/teknikprogrammen" ? "font-bold" : ""}`}
          >
            Teknikprogrammen
          </Link>
          <Link
            href="/estetprogrammen"
            className={`text-xl ${pathname === "/estetprogrammen" ? "font-bold" : ""}`}
          >
            Estetprogrammen
          </Link>
          <Link
            href="/projektveckorna"
            className={`text-xl ${pathname === "/projektveckorna" ? "font-bold" : ""}`}
          >
            Projektveckorna
          </Link>
        </div>

        {/* Mobil/Tablet - Hamburgarmeny */}
          <div className={`fixed right-0 top-24 bottom-0 overflow-y-scroll w-full md:w-3/6 lg:w-2/6 bg-navbar flex flex-col gap-5 items-center overflow-x-hidden xl:hidden ${isOpen ? (isAnimating ? "animate-slideOut" : "animate-slideIn") : "hidden"}`}>
            {/* Teknik */}
            <div className="w-9/12 flex justify-end">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Teknikprogramm"} toPath="/teknikprogramm" size="big" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"App-och Webbutveckling"} toPath="/teknikprogramm/appochwebb" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"AI och Utveckling"} toPath="/teknikprogramm/aiutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Spelutveckling"} toPath="/teknikprogramm/spelutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
              </div>
            </div>

            {/* Estet */}
            <div className="w-9/12 flex justify-end">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Estetprogramm"} toPath="/estetprogramm" size="big" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Grafisk Design"} toPath="/teknikprogramm/appochwebb" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Foto och Film"} toPath="/teknikprogramm/aiutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Media-Beteende"} toPath="/teknikprogramm/spelutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Spelgrafik"} toPath="/teknikprogramm/spelutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
              </div>
            </div>

            {/* Programmveckor */}
            <div className="w-9/12 flex justify-end">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Programmveckor"} toPath="/programmveckor" size="big" currentPath={pathname} closeNavFunc={setIsOpen} />
              </div>
            </div>

            {/* Startsida */}
            <div className="w-9/12 flex justify-end pb-12">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Startsida"} toPath="/" size="big" currentPath={pathname} closeNavFunc={setIsOpen} />
              </div>
            </div>
          </div>
      </nav>
    </div>
  );
}