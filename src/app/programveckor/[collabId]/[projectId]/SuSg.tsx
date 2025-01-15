import PageHeader from "@/app/components/general/PageHeader";
import PageDescription from "@/app/components/general/PageDescription";
import Whitespace from "@/app/components/general/navbar/NavWhitespace";
import Button from "@/app/components/general/Button";

interface SuSgProps {
  gameTitle: string;
  overview: string;
  posterRef?: string;
  itchLink: string;
}

export default function SuSg({gameTitle, overview, posterRef, itchLink}: SuSgProps) {
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
          <Button customClasses={"bg-complementary text-black mx-auto my-8"} link={itchLink} text="Play game" />
        </div>
      </section>
    </main>
  );
}