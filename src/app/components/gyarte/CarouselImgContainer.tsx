interface CarouselImgContainerProps {
  imageRef: string;
}

export default function CarouselImgContainer({imageRef}: CarouselImgContainerProps) {
  return (
    <div className="relative w-full overflow-x-scroll group flex-shrink-0 rounded-md snap-center">
      <img className="w-full h-full" src={imageRef}/>
    </div>
  );
}