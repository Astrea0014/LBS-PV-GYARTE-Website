"use client";
import React, { useState, useEffect } from 'react';

interface ES1Props{
  image? : string,
  image2? : string,
  image3? : string,
  image4? : string,
  longImage? : string
  openModal?: () => void;
}

export default function ES1Fibonacci({image, image2, image3, image4, longImage, openModal} : ES1Props){

  const goldenRatio = 1.618;
  const square = 70; // for adjusting all square sizes
  const square2 = square/goldenRatio;
  const square3 = square2/goldenRatio;
  const square4 = square3/goldenRatio;
  const square5 = square4/goldenRatio;

  const squareMax = 29; // for adjusting all square max sizes
  const squareMax2 = squareMax/goldenRatio;
  const squareMax3 = squareMax2/goldenRatio;
  const squareMax4 = squareMax3/goldenRatio;
  const squareMax5 = squareMax4/goldenRatio;

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  
  useEffect(() => {

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return(
    <section className="cursor-pointer w-fit mx-auto flex flex-col items-center md:flex-row-reverse md:justify-center mb-20" onClick={openModal}>
      
      <div className="flex flex-row md:flex-col">
        <div className=" p-1 md:p-2" style={{height:`${square2}vw`, width:`${square2}vw`, maxHeight:`${squareMax2}rem`, maxWidth:`${squareMax2}rem`}}>
          <div className="bg-complementary w-full h-full bg-cover bg-center" style={{backgroundImage:`url("${image2}")`}}/>          
        </div>

        <div className="flex flex-col md:flex-row-reverse">

          <div className=" p-1 md:p-2" style={{height:`${square3}vw`, width:`${square3}vw`, maxHeight:`${squareMax3}rem`, maxWidth:`${squareMax3}rem`}}>
            <div className="bg-complementary w-full h-full bg-cover bg-center" style={{backgroundImage:`url("${image3}")`}} />              
          </div>
 
          <div className="flex flex-row md:flex-col">


            {viewportWidth >= 768 ? (
            <div className=" p-1 md:p-2" style={{height:`${square5}vw`, width:`${square4}vw`, maxHeight:`${squareMax5}rem`, maxWidth:`${squareMax4}rem`}}>
              <div className="bg-complementary w-full h-full bg-cover bg-center" style={{backgroundImage:`url("${longImage}")`}} />     
            </div>
            ): (
            <div className=" p-1 md:p-2" style={{height:`${square4}vw`, width:`${square5}vw`, maxHeight:`${squareMax4}rem`, maxWidth:`${squareMax5}rem`}}>
              <div className="bg-complementary w-full h-full bg-cover bg-center" style={{backgroundImage:`url("${longImage}")`}} />     
            </div>
            )}


            <div className=" p-1 md:p-2" style={{height:`${square4}vw`, width:`${square4}vw`, maxHeight:`${squareMax4}rem`, maxWidth:`${squareMax4}rem`}}>
              <div className="bg-complementary w-full h-full bg-cover bg-center" style={{backgroundImage:`url("${image4}")`}} />  
            </div>
          </div>
        </div>
      </div>

      <div className=" p-1 md:p-2" style={{height:`${square}vw`, width:`${square}vw`, maxHeight:`${squareMax}rem`, maxWidth:`${squareMax}rem`}}>
        <div className="bg-complementary w-full h-full bg-cover bg-center" style={{backgroundImage:`url("${image}")`}}/>        
      </div>


    </section>
  );
}
