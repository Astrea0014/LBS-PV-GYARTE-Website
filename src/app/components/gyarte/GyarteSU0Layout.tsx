import Video from "../general/Video";

interface SU0LayoutProps{
  videoPath : string;
}

export default function SU0Layout({videoPath} : SU0LayoutProps){

  return(

    <section className="flex justify-center">
      <div className="w-fit my-10 mb-20">
        <Video videoRef={videoPath}/>        
      </div>


    </section>

  );

}