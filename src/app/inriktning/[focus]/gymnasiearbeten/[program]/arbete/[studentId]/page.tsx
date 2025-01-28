"use client";
import Header from "@/app/components/gyarte/GyarteFocusHeader";
import DynamicDataLoader from "@/app/components/gyarte/page_components/DynamicDataLoader";
import { useState, useEffect } from "react";
import { GyDb } from "@/app/lib/DbFetch";
import { Thesis } from "@/app/lib/DbTypes";

interface GyarteProjectsProps {
  params: Promise<{
    studentId: string;
  }>
}

export default function Individual({params} : GyarteProjectsProps){
  const [studentData, setStudentData] = useState<Thesis | string>("Ingen elev med det ID:t");

  useEffect(() => {
    const getStudentData = async () => {
      try{
        const studentWorkId = (await params).studentId;
        const studentIdNumber = parseInt(studentWorkId);
        
        const data = await GyDb.GetThesisById(studentIdNumber);
        console.log("WORK?", data);
        setStudentData(data);
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
          <DynamicDataLoader studentData={studentData} />
        </>
      ) : (
        <section className="h-96 flex justify-center items-center">
          <h1>{studentData}</h1>
        </section>
      )}
    </main>
  );
}