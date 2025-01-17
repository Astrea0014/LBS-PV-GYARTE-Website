import Header from "../../components/gyarte/GyarteFocusHeader";
import SY1Layout from "@/app/components/gyarte/SY1Layout";
import ES1 from "./ES1";
import ES2 from "./ES2";
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
      "id": 2,
      "thesis": "How to draw",
      "course": "GD",
      "author_name": "Wilmer Säfsten",
      "author_class": "GD22",
      "publication_year": 2025,
      "component_id": "ES2",
      "component_data":
      {
        "video_ref": "db/gyarte/3/video.mp4",
        "images":
        [
          {
            "image_ref": "db/gyarte/4/images/img1.jpg",
            "image_title": "My sick image",
            "image_format": "1:1 1024x"
          },
          {
            "image_ref": "db/gyarte/4/images/img2.jpg",
            "image_title": "My not so sick image",
            "image_format": "16:9 1080p"
          },          {
            "image_ref": "db/gyarte/4/images/img3.jpg",
            "image_title": "My sick image",
            "image_format": "1:1 1024x"
          },
          {
            "image_ref": "db/gyarte/4/images/img4.jpg",
            "image_title": "My not so sick image",
            "image_format": "16:9 1080p"
          }
        ]
      }
    }
}

export default function Individual(){

  return(
    <main className="overflow-hidden">

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
              <ES2 data={data}/>
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