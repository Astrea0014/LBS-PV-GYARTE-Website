import Header from "../components/gyarte/GyarteHeader";
import Whitespace from "../components/general/navbar/NavWhitespace";
import Card from "../components/general/Card";

export default function Estetprogram(){
  return(

    <main>
      <Whitespace/>
      <Header bgImage="/lbs-kreativa-gymnasiet-stockholm-sodra-1920x1080.jpg" program="Estetprogramen"/>
      <ul className="flex flex-wrap justify-center p-5 gap-20 my-16">
        <Card focus="GRAFISK DESIGN" image="/gyarte/lbs-grafisk-design-400x300.jpg" link="/gymansiearbete?inriktning=1" />
        <Card focus="SPELGRAFIK" image="/gyarte/lbs-spelgrafik-400x300.jpg" link="/gymansiearbete?inriktning=2" />
        <Card focus="FOTO OCH FILM" image="/gyarte/lbs-foto-och-film-400x300.jpg" link="/gymansiearbete?inriktning=3" />
        <Card focus="MEDIA BETEENDE" image="/gyarte/lbs-media-beteende-400x300.jpg" link="/gymansiearbete?inriktning=4" />
      </ul>
    </main>

  );
}