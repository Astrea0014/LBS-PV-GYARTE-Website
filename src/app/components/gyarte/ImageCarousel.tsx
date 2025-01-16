import TabSelector from "../general/TabSelector"
import ImgContainer from "./CarouselImgContainer";

interface ImageCarouselProps {
  imageRefList: string[];
}

export default function ImageCarousel({imageRefList}: ImageCarouselProps) {
  console.log(imageRefList)
  return(
    <section className="w-full mx-auto">
      <TabSelector fullScreenScroll noBorder noMargin>
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