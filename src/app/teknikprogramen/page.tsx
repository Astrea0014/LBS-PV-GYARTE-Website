import Header from "../components/gyarte/GyarteHeader";
import Whitespace from "../components/general/navbar/NavWhitespace";
import Card from "../components/general/Card";

export default function Teknikprogram(){
  return(

    <main>
      <Whitespace/>
      <Header bgImage="/gyarte/teknik.png" program="Teknikprogramen"/>
      <ul className="flex flex-wrap justify-center p-5 gap-20 my-16 list-none">
        <Card focus="APP- OCH WEBBUTVECKLING" image="/gyarte/lbs-app-och-webbutveckling-400x300.jpg"/>
        <Card focus="AI-UTBILDNING" image="/gyarte/lbs-ai-utbildning-400x225.png"/>
        <Card focus="SPELUTVECKLING" image="/gyarte/lbs-spelutveckling-400x300.jpg"/>
      </ul>
    </main>

  );
}