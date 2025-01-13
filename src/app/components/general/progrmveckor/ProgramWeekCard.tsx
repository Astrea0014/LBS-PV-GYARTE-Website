interface ProgramWeekCardProps {
  collaberators: string[];
  posterSrc: string;
  theme: string;
}


export default function ProgramWeekCard({collaberators, posterSrc, theme}: ProgramWeekCardProps) {
  // Omformaterar participatingPrograms till en string ifall det finns flera program som medverkar i ett projekt.
  let reformattedCollaberators = undefined;
  if (collaberators.length > 1) {
    reformattedCollaberators = collaberators.join(" / ");
  } else if (collaberators.length === 1) {
    reformattedCollaberators = collaberators[0];
  } else {
    console.error("No program asigned to project")
  }

  return (
    <div className="flex flex-col w-8/12 md:w-11/12 my-4">
      <img className="w-full" src={posterSrc} alt={`Poster för programmveckan av ${reformattedCollaberators} med temat ${theme}`}/>
      <div className="p-6 bg-navbar rounded-b-md">
        <h2 className="sm:text-2xl md:text-xl lg:text-2xl text-white"><span className="font-bold">{reformattedCollaberators}</span> - {theme}</h2>
      </div>
    </div>
  );
}