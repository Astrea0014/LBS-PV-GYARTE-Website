"use client";

import { usePathname } from "next/navigation"; 
import Link from "next/link";

interface ProjectCardProps {
  posterSrc: string;
  title: string;
  groupName: string;
  projectId: number;
}

export default function ProjectCard({posterSrc, title, groupName, projectId}: ProjectCardProps) {
  const pathname = usePathname();
  
  return (
    <Link href={`${pathname}/${projectId}`} className="text-light bg-dark w-80 hover:scale-105 hover:bg-complementary hover:text-dark hover:border-black transition font-bold p-6 pb-0 m-4 group">
      <li className="w-full list-none">
        <img className="w-full bg-cover bg-center mx-auto" src={posterSrc} />

        <section className="grid grid-cols-3 justify-center items-center p-4 group-hover:border-black">
          <h2 className="col-span-3 text-center text-xl border-b border-white pb-2 group-hover:border-black font-avenirBlack">{title}</h2>
          <h3 className="col-span-3 text-center text-lg mt-3 font-avenirRoman">{groupName}</h3>
        </section>
      </li>
    </Link>
  );
}