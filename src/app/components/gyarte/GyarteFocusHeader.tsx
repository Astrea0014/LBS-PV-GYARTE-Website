import Header from "../general/PageHeader";

interface FocusHeaderProps {
  thesis : string,
  name : string | null,
  course : string | null,
  year : number,
}

export default function GyarteFocusHeader({thesis, name, course, year} : FocusHeaderProps){
  return(
    <section className="w-screen items-center flex flex-col">
      <Header headerTitle={thesis}/>

      <div className="flex flex-col md:flex-row border-y-2 px-3 py-3 border-dark w-5/6 md:px-10  font-avenirRoman">

        <div className="flex flex-row gap-2 text-center md:text-right justify-center items-center">
          <p className="w-fit">{name}</p>
          <p>{course}</p>
        </div>

        <p className="flex-1 justify-end text-center md:text-right">{year}</p>

      </div>

    </section>

  );
}