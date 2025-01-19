"use client";
import Header from "../../components/gyarte/GyarteFocusHeader";
import SY1Layout from "@/app/components/gyarte/SY1Layout";
import ES1 from "./ES1";
import ES2 from "./ES2";
import SU0Layout from "@/app/components/gyarte/GyarteSU0Layout";
import { useState, useEffect } from "react";
import { GyDb } from "@/app/lib/DbFetch";
import { Thesis } from "@/app/lib/DbTypes";

// test data remove later
// const data = {
//   work :

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
//         "video_ref": "db/gyarte/3/video.mp4",
//         "images":
//         [
//           {
//             "image_ref": "db/gyarte/4/images/img1.jpg",
//             "image_title": "My sick image",
//             "image_format": "1:1 1024x"
//           },
//           {
//             "image_ref": "db/gyarte/4/images/img2.jpg",
//             "image_title": "My not so sick image",
//             "image_format": "16:9 1080p"
//           },          {
//             "image_ref": "db/gyarte/4/images/img3.jpg",
//             "image_title": "My sick image",
//             "image_format": "1:1 1024x"
//           },
//           {
//             "image_ref": "db/gyarte/4/images/img4.jpg",
//             "image_title": "My not so sick image",
//             "image_format": "16:9 1080p"
//           }
//         ]
//       }
//     }
// }

interface GyarteProjectsProps {
  params: Promise<{
    studentId: string;
  }>
}


export default function Individual({params} : GyarteProjectsProps){


  const [studentData, setStudentData] = useState<Thesis | string>("No student with that ID");

  useEffect(() => {
    const getStudentData = async () => {
      try{
        const studentWorkId = (await params).studentId;
        const studentIdNumber = parseInt(studentWorkId);
        
        const data = await GyDb.GetThesisById(studentIdNumber);
        
        if (typeof data === "object") {
          setStudentData(data);
        }
      } catch (error){
        return null;
      }
    }
    getStudentData();
  }, [params]);
  
  console.log("data", studentData);

  return(
    <main className="overflow-hidden">
      {typeof studentData !== "string" ? (
        <>
          <Header thesis={studentData.thesis} name={studentData.author_name} course={studentData.author_class} year={studentData.publication_year}/>
          
          {(() => {
            switch (studentData.component_id) {
              case "ES1":
                return (
                  <ES1 data={studentData}/>
                );

              case "ES2":

                return (
                  <section>
                    <ES2 data={studentData}/>
                  </section>
                );
              
              case "SY0":
                return (
                <SY1Layout websiteLink="https://www.volvocars.com/se/" />
                );

              case "SU0":
                return (
                  <SU0Layout videoPath={`/${studentData.component_data[0]}`}/>
                );

              default:
                return null;
            }
          })()}
        </>
      ) : (
        null
      )}
    </main>
  );
}