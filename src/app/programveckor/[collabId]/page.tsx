"use client";

import PageHeader from "../../components/general/PageHeader";
import PageDescription from "../../components/general/PageDescription";
import ProjectCard from "@/app/components/programveckor/ProjectCard";
import Divider from "@/app/components/general/Divider";
import { PvDb } from "@/app/lib/DbFetch";
import { FullCollaboration } from "@/app/lib/DbTypes";
import { useState, useEffect } from "react";

interface CollaborationProjectsProps {
  params: Promise<{
    collabId: string;
  }>
}

export default function CollaborationProjects({params}: CollaborationProjectsProps) {
  const [collaborationData, setCollaborationData] = useState<FullCollaboration | null>(null)

  useEffect(() => {
    const getCollaberations = async () => {
      const collabId = (await params).collabId;
      const data = await PvDb.GetCollaborationFromId(parseInt(collabId))
      setCollaborationData(data)
    }
    getCollaberations();
  }, [params]);

  return (
    <main>
      {/*Byt till dynamisk input*/}
      <section className="flex flex-col justify-center w-full pb-16">
        <PageHeader headerTitle="Programveckor SU/SG" />
        <PageDescription description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
        <div className="w-full flex  justify-center mx-auto my-8">
          <Divider responsive={false} />
        </div>
        <PageHeader headerTitle="Projekt" centerd/>
        <div className="flex w-11/12 lg:w-10/12 xl:w-8/12 justify-around mx-auto mb-8 flex-wrap">
          {collaborationData ? (
            collaborationData.project_groups.map((project) =>
              <ProjectCard
                key={project.project_id}
                projectId={project.project_id}
                posterRef={project.project_data.poster_ref}
                groupName={project.group_name}
              />
            )
          ) : (
            <span className="loading loading-spinner"/>
          )}
        </div>
      </section>
    </main>
  );

}