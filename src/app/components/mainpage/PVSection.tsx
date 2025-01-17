import Button from "../general/Button";

export default function ProgramveckorSection(){

  return (

    <section className="p-10 md:p-16 flex xl:px-60 font-avenirRoman">

    
      <div className="flex flex-col items-center justify-center mb-8 md:px-5 md:w-1/2">
        <h2 className="font-bold text-3xl w-full text-center mb-4 font-avenirBlack">Programveckor</h2>
        <p className="mb-4">Programveckor är en period där deltagare från olika program arbetar tillsammans för att skapa färdiga, användbara produkter.
          Fokus ligger på samarbete, där varje deltagare bidrar med sin unika kompetens för att lösa verkliga eller simulerade uppgifter.
          Under dessa veckor får deltagarna praktisk erfarenhet av projektarbete, innovation och problemlösning, samtidigt som de utvecklar 
          sina färdigheter i reflektion och feedback. Resultatet är både färdiga produkter och en bättre förståelse för hur olika discipliner 
          kompletterar varandra i arbetslivet.</p>        

        <Button link="/programveckor" text="Mer" customClasses="bg-dark hover:bg-btnHoverDark w-40 font-bold text-light"/>
      </div>

      <picture className="md:block hidden w-1/2 xl:ml-16 my-auto">
        <img src="/lbs-kreativa-gymnasiet-600x600.jpg" alt="Having fun at LBS" />
        <source media="(min-width: 768px)" srcSet="/lbs-kreativa-gymnasiet-800x800.jpg"/>
        <source media="(min-width: 1024px)" srcSet="/lbs-kreativa-gymnasiet-1200x1200.jpg"/>
      </picture>

    </section>

  );

}