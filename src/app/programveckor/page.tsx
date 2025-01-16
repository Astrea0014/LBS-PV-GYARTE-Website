import PageDescription from "../components/general/PageDescription";
import PageHeader from "../components/general/PageHeader";
import SelectorButtonsGroup from "../components/general/SelectorButtonsGroup";
import CardsContainer from "../components/programveckor/CardsContainer";
import Whitespace from "../components/general/navbar/NavWhitespace";

interface ProgramWeeksProps {
  searchParams: Promise<{year: string;}>;
}

export default async function ProgramWeeks({searchParams}: ProgramWeeksProps ) {
  
  const resolvedSearchParams = await searchParams
  const year = resolvedSearchParams.year ?? "Unkown";

  return (
    <main>
      <Whitespace />
      <section className="flex flex-col justify-center w-full py-16">
        <PageHeader headerTitle="Programveckor"/>
        <PageDescription 
          description="Programveckor är en period där deltagare från olika program arbetar tillsammans för att skapa färdiga, användbara produkter.
          Fokus ligger på samarbete, där varje deltagare bidrar med sin unika kompetens för att lösa verkliga eller simulerade uppgifter.
          Under dessa veckor får deltagarna praktisk erfarenhet av projektarbete, innovation och problemlösning, samtidigt som de utvecklar 
          sina färdigheter i reflektion och feedback. Resultatet är både färdiga produkter och en bättre förståelse för hur olika discipliner 
          kompletterar varandra i arbetslivet."
        />
        <SelectorButtonsGroup years={[2027, 2026, 2025]} pathYear={year} />
        
        <CardsContainer year={year} />
      </section>
    </main>
  );
}