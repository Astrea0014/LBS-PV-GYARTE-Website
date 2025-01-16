import Header from "../components/gyarte/GyarteHeader";
import Card from "../components/general/Card";

export default function Teknikprogram(){
  return(

    <main>
      <Header bgImage="/gyarte/teknik.png" program="Teknikprogramen"/>
      <ul className="flex flex-wrap justify-center p-5 gap-20 my-16 list-none">
        <Card focus="APP- OCH WEBBUTVECKLING" image="/gyarte/lbs-app-och-webbutveckling-400x300.jpg" link="/gymansiearbete?inriktning=5" />
        <Card focus="AI-UTBILDNING" image="/gyarte/lbs-ai-utbildning-400x225.png" link="/gymansiearbete?inriktning=6" />
        <Card focus="SPELUTVECKLING" image="/gyarte/lbs-spelutveckling-400x300.jpg" link="/gymansiearbete?inriktning=7" />
      </ul>
    </main>

  );
}