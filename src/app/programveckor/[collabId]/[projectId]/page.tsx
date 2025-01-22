"use client";

import SuSg from "./SuSg";
import { PvDb } from "@/app/lib/DbFetch";
import { useState, useEffect } from "react";
import { ProjectGroup } from "@/app/lib/DbTypes";
import { SUSG01ProjectData } from "@/app/lib/db_proprietary/pv_data_structures/SUSG01";

interface ProjectPageProps {
  params: Promise<{
    collabId: string;
    projectId: string;
  }>
}

export default function ProjectPage({params}: ProjectPageProps) {
  const [projectData, setProjectData] = useState<ProjectGroup | string>("Inget projekt med det ID:et")
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProject = async () => {
      try {
        const projectId = (await params).projectId;
        const projectIdNumber = parseInt(projectId);

        const data = await PvDb.GetProjectFromId(projectIdNumber);
        setProjectData(data);

      } catch (error) {
        return null;

      } finally {
        setIsLoading(false);
      }
    }
    getProject();
  }, [params]);


  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center"> 
          <span className="loading loading-spinner"/>
        </div>
      ) : (
        typeof projectData !== "string" ? (
          // <SuSg 
          //   gameTitle={(projectData.project_data as SUSG01ProjectData).gameTitle}
          // />
          <></>
        ) : (
          <div className="w-full flex justify-center items-center"> 
            <h1 className="text-2xl">{projectData}</h1>
          </div>
        )
      )}
    </>
  );
}