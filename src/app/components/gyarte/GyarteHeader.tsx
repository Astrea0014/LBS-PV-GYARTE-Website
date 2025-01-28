interface HeaderProps{
  bgImage: string;
  focus: string;
}

export default function Header({bgImage, focus}:HeaderProps){
  return(
    <section className="bg-center bg-cover text-light font-bold flex justify-center items-center font-avenirBlack text-center" style={{height:"35vh", backgroundImage:`url("${bgImage}")`}}>

      <h1 className="bg-black bg-opacity-50 w-fit p-4 text-3xl">Gymnasie Arbete för <br />{focus}</h1>

    </section>

  );
}