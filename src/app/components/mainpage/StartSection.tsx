import Button from "../general/Button";
import Background from "../../images/lbs-kreativa-gymnasiet-stockholm-sodra-1920x1080.jpg";

export default function StartSection(){
  return (

    <section className="h-screen top-0 bg-center bg-cover flex justify-center items-center text-light text-center flex-col" style={{backgroundImage:`url(${Background.src})`}}>

      <div className="bg-black bg-opacity-50 p-2">
        <h1 className="text-4xl font-bold">LBS Kreativa<br/>Gymnasiet <br/>Stockholm Södra</h1>
        <h2 className="text-2xl">Gymnasie Arbete <br className="xl:hidden"/>&<br className="xl:hidden"/>Programveckor</h2>        
      </div>


    </section>

  );
}