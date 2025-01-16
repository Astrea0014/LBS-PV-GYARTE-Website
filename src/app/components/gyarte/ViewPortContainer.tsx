"use client";
import React, { useState, useEffect } from 'react';

interface ViewportRatioContainerProps {
  children: React.ReactNode;
}


export default function ViewportRatioContainer({ children }: ViewportRatioContainerProps) {
  const [aspectRatio, setAspectRatio] = useState(16/9);

  useEffect(() => { 
    const updateAspectRatio = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    updateAspectRatio();
    
    window.addEventListener('resize', updateAspectRatio);
    
    return () => {
      window.removeEventListener('resize', updateAspectRatio);
    };
  }, []);

  return (
    <div className="w-full relative">
      <div 
        className="w-full h-0"
        style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }} // padding-bottom i procent beräknas i förhållande till elementets bredd. Bildförhållandet styrs alltså av padding-bottom då höjden på behållaren är proptionell till dess bredd - baserat på aspect ration :).
      >
        <div className="absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
};
