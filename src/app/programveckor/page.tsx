"use client";

import PageDescription from "../components/general/PageDescription";
import PageHeader from "../components/general/PageHeader";
import SelectorButtonsGroup from "../components/general/SelectorButtonsGroup";
import CardsContainer from "../components/programveckor/CardsContainer";
import { useState, useEffect } from "react";


interface ProgramWeeksProps {
  searchParams: Promise<{year: string;}>;
}

export default function ProgramWeeks({searchParams}: ProgramWeeksProps ) {
  const [paramYear, setParamYear] = useState<string>("Unkown");

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedSearchParams = (await searchParams).year ?? "Unkown";
      setParamYear(resolvedSearchParams);
    }
    resolveParams();
  }, [searchParams]);

  return (
    <main>
      <section className="flex flex-col justify-center w-full py-16">
        <PageHeader headerTitle="Programveckor"/>
        <PageDescription 
          description="Programveckor är en period där deltagare från olika program arbetar tillsammans för att skapa färdiga, användbara produkter.
          Fokus ligger på samarbete, där varje deltagare bidrar med sin unika kompetens för att lösa verkliga eller simulerade uppgifter.
          Under dessa veckor får deltagarna praktisk erfarenhet av projektarbete, innovation och problemlösning, samtidigt som de utvecklar 
          sina färdigheter i reflektion och feedback. Resultatet är både färdiga produkter och en bättre förståelse för hur olika discipliner 
          kompletterar varandra i arbetslivet."
        />
        <SelectorButtonsGroup years={[2027, 2026, 2025]} pathYear={paramYear} />
        
        <CardsContainer year={paramYear} />
      </section>
    </main>
  );
}