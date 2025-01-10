"use client";
import Navigation from "./Navigation";
import NavigationBreadcrumbs from "./NavigationBreadcrumbs";

export default function Navbar() {
  return (
    <>
      <header className="bg-navbar w-full flex justify-between items-center h-24 text-white top-0 sticky z-40 box-border px-4">
        <img className="w-64" src="https://lbs.se/wp-content/uploads/2023/04/lbs-logo-white2.gif" alt="LBS"/>
        <Navigation />
      </header>
      
      <NavigationBreadcrumbs
        homeElement={"Startsida"}
        separator={<span className="font-extrabold">&nbsp; › &nbsp;</span>}
        activeClasses="font-bold"
        containerClasses="flex p-5 text-2xl fixed"
        listClasses="hover:underline mx-2"
        capitalizeLinks
      />
    </>
  );
}