"use client";

import PageDescription from "../components/general/PageDescription";
import PageHeader from "../components/general/PageHeader";
import SelectorButtonsGroup from "../components/general/SelectorButtonsGroup";
import TabSelector from "../components/general/TabSelector";
import CardsContainer from "../components/programveckor/CardsContainer";
import { PvDb } from "../lib/DbFetch";
import { Collaboration } from "../lib/DbTypes";
import { useState, useEffect } from "react";

interface ProgramWeeksProps {
  searchParams: Promise<{year: string;}>;
}

export default function ProgramWeeks({searchParams}: ProgramWeeksProps ) {
  
  const [paramYear, setParamYear] = useState<string>("Unkown");
  const [collabYears, setCollabYears] = useState<number[] | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collaborationsData, setCollaborationsData] = useState<Collaboration[] | string>("No projects from that year")

  useEffect(() => {
    const getCollaborationsData = async () => {
      try {
        const resolvedSearchParams = (await searchParams).year ?? "Unknown";
        const year = parseInt(resolvedSearchParams);

        const data = await PvDb.GetCollaborationsFromYear(year);

        if (data.length > 0) {
          setCollaborationsData(data);
        };

        console.log(data);
        setParamYear(resolvedSearchParams);
      } catch (error) {
        return null;
      } finally {
        setIsLoading(false);
      }
    }
    getCollaborationsData();
  }, [searchParams]);

  useEffect(() => {
    const getCollabYears = async () => {
      const years = await PvDb.GetDbPresentYears();
      setCollabYears(years);
    } 
    getCollabYears()
  }, []);

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
        {collabYears ? (
          <SelectorButtonsGroup years={collabYears} pathYear={paramYear} />
        ) : (
          null
        )}

        {isLoading ? ( 
          <div className="w-full flex justify-center my-12">
            <span className="loading loading-spinner" />
          </div>
        ) : (
          typeof collaborationsData != "string" ? (
            <CardsContainer year={paramYear} data={collaborationsData} />
          ) : (
            <div className="w-full flex justify-center my-12 text-2xl">
              {collaborationsData}
            </div>
          )
        )}
      </section>
    </main>
  );
}