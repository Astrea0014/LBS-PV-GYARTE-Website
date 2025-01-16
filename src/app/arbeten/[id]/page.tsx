import Header from "../../components/gyarte/GyarteFocusHeader";
import ESOverview from "../../components/gyarte/GyarteESXOverview";
import SY1Layout from "@/app/components/gyarte/SY1Layout";
import ES1 from "./ES1";
import SU0Layout from "@/app/components/gyarte/GyarteSU0Layout";

interface ImageData {
  image_ref : string,
  image_title : string,
  image_format : string;
};

// test data remove later
const data = {
  work :
  {
    "id": 3,
    "thesis": "How to make hentai games",
    "course": "SU",
    "author_name": "Philip Jansson",
    "author_class": "SU25d",
    "publication_year": 2028,
    "component_id": "SU0",
    "component_data":
    {
      "video_ref": "db/gyarte/3/video.mp4"
    }
  }
}

export default function Individual(){

  return(
    <main>

      <Header thesis={data.work.thesis} name={data.work.author_name} course={data.work.author_class} year={data.work.publication_year}/>
      
      {(() => {
      switch (data.work.component_id) {
        case "ES1":
          return (
            <ES1 data={data}/>
          );

        case "ES2":

          return (
            <section>
              <ESOverview description={null}/>
            </section>
          );
        
        case "SY0":
          return (
          <SY1Layout websiteLink="https://www.volvocars.com/se/" />
          );

        case "SU0":
          return (
            <SU0Layout videoPath={`/${data.work.component_data.video_ref}`}/>
          );

        default:
          return null;
      }
    })()}
    </main>
  );
}