import Card from "../general/Card";
import { Collaboration } from "@/app/lib/DbTypes";
interface CardsContainerProps {
  year: string | null;
  data: Collaboration[];
}

export default function CardsContainer({ year, data }: CardsContainerProps) {
  return (
    <section className="w-12/12 lg:w-10/12 xl:w-8/12 mx-auto">
      <ul className="flex flex-wrap justify-center p-5 gap-20 my-16 list-none">
        {data.map((collab) =>
          <Card 
            key={collab.collaboration_id}
            focus={collab.collaborators}
            image={collab.poster_ref}
            theme={collab.theme}
            link={`/programveckor/${collab.collaboration_id}`}
          />
        )}
      </ul>
    </section>
  );
}

