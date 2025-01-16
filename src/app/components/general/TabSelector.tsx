"use client";

import React from "react";
import { useRef } from "react";
import ArrowButton from "./ArrowButton";

interface TabSelectorProp {
  children: React.ReactNode;
  fullScreenScroll?: boolean;
  noBorder?: boolean;
}

export default function TabSelector({children, fullScreenScroll, noBorder}: TabSelectorProp) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (carouselRef.current) {
      let scrollAmount: number = carouselRef.current.scrollWidth / (React.Children.count(children))
      if (!fullScreenScroll) {
        scrollAmount = window.innerWidth < 420 ? 75 : window.innerWidth < 768 ? 150 : window.innerWidth < 1024 ? 300 : 480; // Definerar hur många pixlar per knapptyck
      }
      carouselRef.current.scrollLeft -= scrollAmount;
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollLeft += carouselRef.current.scrollWidth;
      }
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      let scrollAmount: number = carouselRef.current.scrollWidth / (React.Children.count(children))
      if (!fullScreenScroll) {
        scrollAmount = window.innerWidth < 420 ? 75 : window.innerWidth < 768 ? 150 : window.innerWidth < 1024 ? 300 : 480; // Definerar hur många pixlar per knapptyck
      }
      carouselRef.current.scrollLeft += scrollAmount;
      if (carouselRef.current.scrollLeft === (carouselRef.current.scrollWidth - carouselRef.current.clientWidth)) {
        carouselRef.current.scrollLeft -= carouselRef.current.scrollWidth;
      }
    }
  };

  return (
    <div className={`relative flex items-center w-11/12 lg:w-10/12 xl:w-8/12 mx-auto mt-16 p-8 ${noBorder ? "" : "border-black border-solid border-y-2"}`}>
      <ArrowButton direction="left" scrollFunc={scrollLeft}/>
      <div 
        className="flex mx-4 w-full overflow-x-scroll scroll-smooth whitespace-nowrap no-scrollbar gap-3 snap-x"
        ref={carouselRef}
      >
        {children}
      </div>
      <ArrowButton direction="right" scrollFunc={scrollRight}/>
    </div>
  );
}