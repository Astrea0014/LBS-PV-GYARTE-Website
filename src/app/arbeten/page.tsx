"use client"

import Selector from "../components/general/SelectorButtonsGroup";
import GyarteCard from "../components/gyarte/GyarteCard";
import Header from "../components/general/PageHeader";
import Overview from "../components/general/PageDescription";
import {useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Thesis } from "../lib/DbTypes";
import { GyDb } from "../lib/DbFetch";

// Temporary student work data (object): replace later
// const data = {
//   works : [
//     {
//       "id": 1,
//       "thesis": "Utvärdering av olika kryptografiska teknologier och metoder för kommunikation mellan olika enheter över ett nätverk",
//       "course": "SY",
//       "author_name": "Douglas Lyman",
//       "author_class": "SY22",
//       "publication_year": 2025,
//       "component_id": "SY0",
//       "component_data":
//       {
//         "href": "https://artemisdevgroup.github.io/"
//       }
//     },
//     {
//       "id": 2,
//       "thesis": "How to draw",
//       "course": "GD",
//       "author_name": "Wilmer Säfsten",
//       "author_class": "GD22",
//       "publication_year": 2025,
//       "component_id": "ES2",
//       "component_data":
//       {
//         "video_ref": "gyarte/2/video.mp4",
//         "images":
//         [
//           {
//             "image_ref": "gyarte/2/images/img1.jpg",
//             "image_title": "My sick image",
//             "image_format": "1:1 1024x"
//           },
//           {
//             "image_ref": "gyarte/2/images/img2.jpg",
//             "image_title": "My not so sick image",
//             "image_format": "16:9 1080p"
//           }
//         ]
//       }
//     },
//     {
//       "id": 3,
//       "thesis": "How to make hentai games",
//       "course": "SU",
//       "author_name": "Philip Jansson",
//       "author_class": "SU25d",
//       "publication_year": 2028,
//       "component_id": "SU0",
//       "component_data":
//       {
//         "video_ref": "db/gyarte/3/video.mp4"
//       }
//     },
//     {
//       "id": 4,
//       "thesis": "My life in pictures",
//       "course": "FF",
//       "author_name": "Zixuan Huang",
//       "author_class": "FF23",
//       "publication_year": 2026,
//       "component_id": "ES1",
//       "component_data":
//       [
//         {
//           "image_ref": "db/gyarte/4/images/img1.jpg",
//           "image_title": "Pog1",
//           "image_format": "1:2"
//         },
//         {
//           "image_ref": "db/gyarte/4/images/img2.jpg",
//           "image_title": "Pog2",
//           "image_format": "1:1"
//         },
//         {
//           "image_ref": "db/gyarte/4/images/img3.jpg",
//           "image_title": "Pog3",
//           "image_format": "16:9"
//         }
//       ]
//     }
//   ]
// }

interface GyarteProps {
  searchParams: Promise<{inriktning: string}>,
}

const yearsList = [2025, 2026, 2027] // temporary year list: replace later

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
  const [paramCourse, setParamCourse] = useState<string>("Unkown");
  const [projectsData, setProjectsData] = useState<Thesis[] | string>("No student with that ID");
  const router = useRouter();

  useEffect(() => {
    const getGyarteProjects = async () => {
      try{
        const resolvedSearchParams = (await searchParams).inriktning ?? "Unkown";
        setParamCourse(resolvedSearchParams);

        if (!IsValid(resolvedSearchParams)){
          router.push("/404")
        }
        
        const data = await GyDb.GetThesesByYearAndCourse(2025, resolvedSearchParams);
        
        if (typeof data === "object") {
          setProjectsData(data);
        }

      } catch (error){
        return null;
      }

    }
    getGyarteProjects();
  }, [searchParams, router]);

  
  
  return(
    <main>
      {projectsData.length > 0 ? (
      <>
        <Header headerTitle={`Gymnasie Arbete för ${paramCourse}`}/>
        <Overview description="Detta är ett arkiv över tidigare gymnasiearbeten utförda av elever vid LBS Kreativa Gymnasium Stockholm Södra. Här presenteras arbeten från flera av våra olika utbildningsprogram. Du kan bland annat hitta exempel på spelprogrammering från Spelutvecklingsprogrammet, webbplatser från programmet för App- och Webbutveckling. Samt imponerande bilder, kollage och videor skapade av elever från våra Estetiska program."/>

        <Selector years={yearsList} pathYear={"2027"}/>

        <section className="mb-28">
          {typeof projectsData !== "string" ? (
            projectsData.map((work) => 
              <GyarteCard
              key={work.id}
              thesis={work.thesis}
              name={work.author_name}
              course={work.author_class}
              year={work.publication_year}
              />
            )
          ) : (
            <span className="loading loading-spinner"/>
          )}
        </section>
      </>
      ) : (
        null
      )} 

    </main>



  );
}
