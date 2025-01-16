import Button from "../general/Button";

export default function StartSection(){
  return (

    <section className="h-screen top-0 bg-center bg-cover flex justify-center items-center text-light text-center flex-col7 lg:text-left lg:justify-start" style={{backgroundImage:`url("/lbs-kreativa-gymnasiet-stockholm-sodra-1920x1080.jpg")`}}>

      <div className="bg-black bg-opacity-50 p-4 lg:ml-20">
        <h1 className="text-4xl font-bold md:text-6xl">LBS Kreativa<br/>Gymnasiet <br/>Stockholm Södra</h1>
        <h2 className="text-2xl md:text-4xl lg:mt-4">Gymnasie Arbete <br className="lg:hidden"/>& <br className="lg:hidden"/>Programveckor</h2>        
      </div>


    </section>

  );
}