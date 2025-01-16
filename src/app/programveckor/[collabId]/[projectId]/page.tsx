import SuSg from "./SuSg";


interface ProjectPageProps {
  params: Promise<{
    collabId: string;
    projectId?: string;
  }>
}

export default async function ProjectPage({params}: ProjectPageProps) {
  const { collabId, projectId } = await params;

  return (
    <SuSg itchLink="/https://krajzeg.itch.io/solitomb" gameTitle="Hollow Knight" overview="Players take on the role of the Knight, a silent, enigmatic figure armed with a nail-like weapon, as they journey through a series of diverse biomes such as fungal caverns, crystal mines, and decaying cities." posterRef="/Hollow_Knight_first_cover_art.webp.png" />
  );
}