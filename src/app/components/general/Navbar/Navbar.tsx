"use client";
import Navigation from "./Navigation";
import NavigationBreadcrumbs from "./NavigationBreadcrumbs";

export default function Navbar() {
  return (
    <>
      <header className="bg-navbar w-full flex justify-between items-center h-24 text-white top-0 fixed z-40 box-border px-4">
        <img className="w-48 lg:w-64" src="/lbslogorgbvit.svg" alt="LBS"/>
        <Navigation />
      </header>
      
      <NavigationBreadcrumbs
        homeElement={"Startsida"}
        separator={<span className="font-extrabold text-2xl relative bottom-1"> › </span>}
        activeClasses="font-bold"
        containerClasses="hidden lg:flex text-xl lg:p-3 fixed top-24"
        listClasses="hover:underline mx-2"
        capitalizeLinks
      />
    </>
  );
}