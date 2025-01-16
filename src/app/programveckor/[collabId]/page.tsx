import PageHeader from "../../components/general/PageHeader";
import PageDescription from "../../components/general/PageDescription";
import Whitespace from "@/app/components/general/navbar/NavWhitespace";
import ProjectCard from "@/app/components/progrmveckor/ProjectCard";
import Divider from "@/app/components/general/Divider";

interface CollaborationProjectsProps {
  params: Promise<{
    collabId: string;
  }>
}

export default async function CollaberationProjects({params}: CollaborationProjectsProps) {
  const id = (await params).collabId;

  // Hämta projekt.
  const data = {
    projects: [
      {
        id: 1,
        posterSrc: "/Hollow_Knight_first_cover_art.webp.png",
        title: "Hollow Knight",
        groupName: "Team Cherry",
      },
      {
        id: 2,
        posterSrc: "/Hollow_Knight_first_cover_art.webp.png",
        title: "Hollow Knight",
        groupName: "Team Cherry",
      },
      {
        id: 3,
        posterSrc: "/Hollow_Knight_first_cover_art.webp.png",
        title: "Hollow Knight",
        groupName: "Team Cherry",
      },
      {
        id: 4,
        posterSrc: "/Hollow_Knight_first_cover_art.webp.png",
        title: "Hollow Knight",
        groupName: "Team Cherry",
      },
    ]
  }

  return (
    <main>
      <Whitespace />
      {/*Byt till dynamisk input*/}
      <section className="flex flex-col justify-center w-full py-16">
        <PageHeader headerTitle="Programveckor SU/SG" />
        <PageDescription description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
        <div className="w-full flex  justify-center mx-auto my-8">
          <Divider responsive={false} />
        </div>
        <PageHeader headerTitle="Projekt" centerd/>
        <div className="flex w-11/12 lg:w-10/12 xl:w-8/12 justify-around mx-auto mb-8 flex-wrap">
          {data.projects.map((project) =>
            <ProjectCard 
              key={project.id}
              projectId={project.id}
              posterSrc={project.posterSrc}
              title={project.title}
              groupName={project.groupName}
            />
          )}
        </div>
      </section>
    </main>
  );

}