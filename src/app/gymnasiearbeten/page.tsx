"use client"

import Selector from "../components/general/SelectorButtonsGroup";
import GyarteCard from "../components/gyarte/GyarteCard";
import Header from "../components/general/PageHeader";
import Overview from "../components/general/PageDescription";
import {useState, useEffect } from "react";
import { Thesis } from "../lib/DbTypes";
import { GyDb } from "../lib/DbFetch";


interface GyarteProps {
  searchParams: 
  Promise<{
    inriktning: string
    year: string;
  }>,
}

// New course needs to be set in this function for the route to be valid
function IsValid(value: string): boolean {
  switch (value) {
    case 'SY':
    case 'SU':
    case 'GD':
    case 'FF':
    case 'MB':
    case 'AI':
    case 'SG':
      return true;
    default:
      return false; 
  }
}

export default function Gyarte({searchParams} : GyarteProps){
  const [collabYears, setCollabYears] = useState<number[] | null>(null);
  const [paramYear, setParamYear] = useState<string>("Unkown");

  const [paramCourse, setParamCourse] = useState<string>("Unkown");
  const [projectsData, setProjectsData] = useState<Thesis[] | string>("Inga projekt från den inriktningen, det året.");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getGyarteProjects = async () => {
      try {
        const searchParamYear = (await searchParams).year ?? "Unknown";
        setParamYear(searchParamYear);
        const year = parseInt(searchParamYear);
        
        const searchParamCourse = (await searchParams).inriktning ?? "Unkown";
        setParamCourse(searchParamCourse);

        const data = await GyDb.GetThesesByYearAndCourse(year, searchParamCourse);
        if (data.length > 0) {
          setProjectsData(data);
        }

      } catch (error){
        return null;

      } finally {
        setIsLoading(false)
      }
    }
    getGyarteProjects();
  }, [searchParams]);


  useEffect(() => {
    const getCollabYears = async () => {
      const years = await GyDb.GetDbPresentYears();
      setCollabYears(years);
    } 
    getCollabYears()
  }, []);
  
  return(
    <main>
      {!isLoading ? (
        typeof projectsData !== "string" ? (
          <>
            <Header headerTitle={`Gymnasie Arbete för ${paramCourse}`}/>
            <Overview description="Detta är ett arkiv över tidigare gymnasiearbeten utförda av elever vid LBS Kreativa Gymnasium Stockholm Södra. Här presenteras arbeten från flera av våra olika utbildningsprogram. Du kan bland annat hitta exempel på spelprogrammering från Spelutvecklingsprogrammet, webbplatser från programmet för App- och Webbutveckling. Samt imponerande bilder, kollage och videor skapade av elever från våra Estetiska program."/>

            {collabYears ? (
              <Selector years={collabYears} pathYear={paramYear}/>
            ) : (
              null
            )}

            <section className="mb-28">
              {projectsData.map((work) => 
                <GyarteCard
                  key={work.id}
                  thesis={work.thesis}
                  name={work.author_name}
                  course={work.author_class}
                  year={work.publication_year}
                />
              )}
            </section>
          </>
        ) : (
          <section className="h-96 flex justify-center items-center">
            <h1>{projectsData}</h1>
          </section>
        )     
      ) : (
        <div className="mx-auto flex justify-center items-center">
          <span className="loading loading-spinner"/>
        </div>
      )}
    </main>
  );
}
