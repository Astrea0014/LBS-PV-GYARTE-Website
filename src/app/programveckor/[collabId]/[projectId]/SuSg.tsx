import PageHeader from "@/app/components/general/PageHeader";
import PageDescription from "@/app/components/general/PageDescription";
import Whitespace from "@/app/components/general/navbar/NavWhitespace";
import { Video } from "@/app/components/progrmveckor/Video";
import AltButton from "@/app/components/progrmveckor/AltButton";


interface SuSgProps {
  gameTitle: string;
  overview: string;
  posterRef?: string;
  itchLink: string;
  videoRef?: string;
}

export default function SuSg({gameTitle, overview, posterRef, itchLink, videoRef}: SuSgProps) {
  return (
    <main>
      <Whitespace />
      <section className="my-16 p-4 sm:py-16 sm:px-16 w-11/12 lg:w-10/12 xl:w-8/12 mx-auto flex bg-dark text-white flex-wrap justify-center">

        <div className="w-72 sm:w-80">
          <img className="object-contain w-full border-white border" src={posterRef} alt="Missing poster source"/>
        </div>

        <div className="w-5/6 sm:w-4/6 mt-8">
          <PageHeader headerTitle={gameTitle} centerd />
          <PageDescription description={overview} />
          <AltButton customClasses={"bg-complementary text-black mx-auto my-8 py-2 px-4"} link={itchLink} text="Play&nbsp;game" />
        </div>
      </section>
      
      <section className="my-24 flex flex-col items-center justify-center bg-dark py-24">
        <PageHeader colorClass="text-white" headerTitle="Video av arbetet" centerd /> 
        <div className="text-white">
          <Video videoRef={videoRef}/>
        </div>
      </section>

      <AltButton link={itchLink} text="Play&nbsp;game" customClasses={"bg-complementary text-black mx-auto my-8 px-32 py-4 text-xl"} />
    </main>
  );
}