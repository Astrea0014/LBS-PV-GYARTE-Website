import Header from "../../components/gyarte/GyarteFocusHeader";

import ES1Layout from "../../components/gyarte/GyarteES1";
import SY1Layout from "@/app/components/gyarte/SY1Layout";

// test data remove later
const data = {
  work :
  {
    "id": 1,
    "thesis": "My life in pictures",
    "course": "FF",
    "author_name": "Noel Gabrielsson Lithander",
    "author_class": "FF23",
    "publication_year": 2026,
    "component_id": "ES1",
    "component_data":
    [
      {
        "image_ref": "db/gyarte/1/images/img1.jpg",
        "image_title": "Pog1",
        "image_format": "1:2"
      },
      {
        "image_ref": "db/gyarte/1/images/img2.jpg",
        "image_title": "Pog2",
        "image_format": "1:1"
      },
      {
        "image_ref": "db/gyarte/1/images/img3.jpg",
        "image_title": "Pog3",
        "image_format": "1:1"
      },
      {
        "image_ref": "db/gyarte/1/images/img4.jpg",
        "image_title": "Pog4",
        "image_format": "16:9"
      },
      {
        "image_ref": "db/gyarte/1/images/img5.jpg",
        "image_title": "Pog5",
        "image_format": "16:9"
      },

    ]
  }
}

export default function Individual(){
  return(
    <main>

      <Header 
        thesis={data.work.thesis} 
        name={data.work.author_name} 
        course={data.work.author_class} 
        year={data.work.publication_year}
      />

      {/* <ES1Layout 
        image={`/${data.work.component_data[0].image_ref}`} 
        image2={`/${data.work.component_data[1].image_ref}`} 
        image3={`/${data.work.component_data[2].image_ref}`} 
        image4={`/${data.work.component_data[3].image_ref}`}
        longImage={`/${data.work.component_data[4].image_ref}`}
      /> */}

      <SY1Layout websiteLink="https://www.volvocars.com/se/" />

    </main>

  );
}
