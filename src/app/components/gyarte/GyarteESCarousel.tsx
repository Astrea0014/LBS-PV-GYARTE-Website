"use client";
import { useRef } from "react";

interface ImageData {
  image_ref : string,
  image_title? : string | null,
  image_format? : string;
};

interface CarouselProps{
  imageList : ImageData[]; // CHANGE!!!!
}

export default function Carousel({imageList} : CarouselProps){

  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const centerImage = (index : number) => {
    const selectedItem = itemRefs.current[index];
    if (selectedItem) {
      selectedItem.scrollIntoView(
        behavior : "smooth",
        block : "center",
        inline : "center"
      )};
  };

  return(
      <ul className="flex flex-row whitespace-nowrap overflow-x-auto w-11/12 mx-auto border border-black">

        {imageList.map((image, index) => (

          <li id={image.image_ref} 
          className={`border border-black ${index === 0 ? 'ml-5' : ''}`}>
            <img src={`/${image.image_ref}`} alt="test" 
            className="min-w-60"/>

            <span>{image.image_title}</span>

          </li>

        )
        
        
        )}

      </ul>
  );
}