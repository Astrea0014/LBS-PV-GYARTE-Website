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
    <div className="w-full flex justify-end font-avenirRoman">
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
        <div className="hidden xl:flex gap-16 w-5/6 justify-end">
          <Link
            href="/"
            className={`text-xl ${pathname === "/" ? "font-bold" : ""}`}
          >
            Startsida
          </Link>
          <Link
            href="/teknikprogrammen"
            className={`text-xl ${pathname.startsWith("/teknikprogrammen") ? "font-bold" : ""}`}
          >
            Teknikprogrammen
          </Link>
          <Link
            href="/estetprogrammen"
            className={`text-xl ${pathname.startsWith("/estetprogrammen") ? "font-bold" : ""}`}
          >
            Estetprogrammen
          </Link>
          <Link
            href="/programveckor?year=2027"
            className={`text-xl ${pathname.startsWith("/programveckor") ? "font-bold" : ""}`}
          >
            Programveckor
          </Link>
        </div>

        {/* Mobil/Tablet - Hamburgarmeny */}
          <div className={`fixed right-0 top-24 bottom-0 overflow-y-scroll w-full md:w-3/6 lg:w-2/6 bg-navbar flex flex-col gap-5 items-center overflow-x-hidden xl:hidden ${isOpen ? (isAnimating ? "animate-slideOut" : "animate-slideIn") : "hidden"}`}>
            {/* Teknik */}
            <div className="w-9/12 flex justify-end">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Teknikprogrammen"} toPath="/teknikprogrammen" size="big" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"App-och Webbutveckling"} toPath="/teknikprogrammen/appochwebb" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"AI och Utveckling"} toPath="/teknikprogrammen/aiutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Spelutveckling"} toPath="/teknikprogrammen/spelutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
              </div>
            </div>

            {/* Estet */}
            <div className="w-9/12 flex justify-end">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Estetprogrammen"} toPath="/estetprogrammen" size="big" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Grafisk Design"} toPath="/estetprogrammen/appochwebb" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Foto och Film"} toPath="/estetprogrammen/aiutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Media-Beteende"} toPath="/estetprogrammen/spelutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
                <LinkHeader title={"Spelgrafik"} toPath="/estetprogrammen/spelutveckling" size="small" currentPath={pathname} closeNavFunc={setIsOpen} />
              </div>
            </div>

            {/* Programveckor */}
            <div className="w-9/12 flex justify-end">
              <div className="flex flex-col items-end w-full">
                <LinkHeader title={"Programveckor"} toPath="/programveckor?year=2027" size="big" currentPath={pathname} closeNavFunc={setIsOpen} /> {/* Change path to last years projects */}
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