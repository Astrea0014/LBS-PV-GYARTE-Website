interface OverviewProps{
  description? : string | null;
}

export default function ESXOverview({description} : OverviewProps){

  return (

    <section className="w-screen flex justify-center items-center px-20 mb-11 lg:px-36 xl:px-72 font-avenirRoman">
      <p>{description}</p>
    </section>

  );

}