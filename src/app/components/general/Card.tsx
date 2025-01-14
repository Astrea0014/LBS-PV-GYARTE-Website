import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

interface CardProps{
  image : string,
  focus : string | string[],
  theme?: string;
  focusId? : string,
}

export default function Card({image, focus, focusId, theme} : CardProps){
    // Omformaterar participatingPrograms till en string ifall det finns flera program som medverkar i ett projekt.
    if (typeof focus != "string") { 
      if (focus.length > 1) {
        focus = focus.join(" / ");
      } else if (focus.length === 1) {
        focus = focus[0];
      } else {
        console.error("No program asigned to project")
      }
    }

  return(
    <Link href={`/gymansiearbete?inriktning=${focusId}`} className="w-full bg-dark text-light max-w-80 hover:scale-105 hover:bg-complementary transition font-bold hover:text-dark">
      <li className="w-full h-80 list-none">
        <section className="w-full h-3/4 bg-cover bg-center" style={{backgroundImage:`url("${image}")`}} />

        <section className="grid grid-cols-4 justify-center items-center h-1/4">
          <h3 className="col-span-3 text-center text-xl ">{focus} - {theme}</h3>
          <GoArrowRight className="m-auto text-5xl"/>
        </section>

      </li>
    </Link>
  );
}