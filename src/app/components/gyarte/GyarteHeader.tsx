interface HeaderProps{
  bgImage: string;
  program: string;
}

export default function Header({bgImage, program}:HeaderProps){
  return(
    <section className="bg-center bg-cover text-light font-bold flex justify-center items-center" style={{height:"35vh", backgroundImage:`url("${bgImage}")`}}>

      <h1 className="bg-black bg-opacity-50 w-fit p-4 text-3xl">Gymnasie Arbete för <br />{program}</h1>

    </section>

  );
}