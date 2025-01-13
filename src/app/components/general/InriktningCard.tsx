import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
interface CardProps{
  image : string,
  inriktning : string,
  inriktningsId? : string,
}

export default function Card({image, inriktning, inriktningsId} : CardProps){
  return(
    <Link href={`/gymansiearbete?inriktning=${inriktningsId}`} className="w-full bg-dark text-light max-w-80 hover:scale-105 hover:bg-complementary transition font-bold hover:text-dark">
      <li className="w-full h-80">
        <section className="w-full h-3/4 bg-cover bg-center" style={{backgroundImage:`url("${image}")`}}>

        </section>

        <section className="grid grid-cols-4 justify-center items-center h-1/4">
          <h3 className="col-span-3 text-center text-xl ">{inriktning}</h3>
          <GoArrowRight className="m-auto text-5xl"/>          
        </section>

      </li>
    </Link>
  );
}