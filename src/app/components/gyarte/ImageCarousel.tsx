import TabSelector from "../general/TabSelector"
import Whitespace from "../general/navbar/NavWhitespace";
import ImgContainer from "./CarouselImgContainer";

interface ImageCarouselProps {
  imageRefList: string[];
}

export default function ImageCarousel({imageRefList}: ImageCarouselProps) {
  console.log(imageRefList)
  return(
    <section className="w-full lg:w-10/12 xl:w-9/12 2xl:w-8/12 mx-auto">
      <Whitespace />
      <TabSelector fullScreenScroll noBorder>
        {imageRefList.map((imageRef) =>
          <ImgContainer 
            key={imageRef}
            imageRef={`/${imageRef}`} 
          />
        )}
      </TabSelector>
    </section>
  );
}