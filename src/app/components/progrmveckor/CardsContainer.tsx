"use client"
import { useState, useEffect } from "react"; 
import Card from "../general/Card";

interface CardsContainerProps {
  year: string | null;
}

export default function CardsContainer({ year }: CardsContainerProps) {
  // Get info from database with year ->
  console.log(year)
  const testInfo = {
    collaborations: [
      {
        "collaboration_id": 1,
        "year": 2025,
        "description": "This is a collaboration!!",
        "posterSrc" : "/gyarte/lbs-spelutveckling-400x300.jpg",
        "theme": "Hållbarhet",
        "collaborators": [
          "SU",
          "SG"
        ]
      },
      {
        "collaboration_id": 2,
        "year": 2025,
        "theme": "Framtid",
        "posterSrc" : "/gyarte/lbs-ai-utbildning-400x225.png",
        "description": "This is a collaboration 2!!",
        "collaborators": [
          "AW",
        ]
      },
      {
        "collaboration_id": 3,
        "year": 2025,
        "theme": "Mänskliga Rättigheter",
        "posterSrc" : "/gyarte/lbs-app-och-webbutveckling-400x300.jpg",
        "description": "This is a collaboration 3!!",
        "collaborators": [
          "FF",
          "MB"
        ]
      },
      {
        "collaboration_id": 4,
        "year": 2025,
        "theme": "Förr i tiden",
        "posterSrc": "/gyarte/lbs-media-beteende-400x300.jpg",
        "description": "This is a collaboration 4!!",
        "collaborators": [
          "GD",
        ]
      }
    ]
  };

  const collaborations = testInfo.collaborations;

  return (
    <section className="w-12/12 lg:w-10/12 xl:w-8/12 mx-auto">
      <ul className="flex flex-wrap justify-center p-5 gap-20 my-16 list-none">
        {testInfo.collaborations.map((collab) =>
          <Card 
            key={collab.collaboration_id}
            focus={collab.collaborators}
            image={collab.posterSrc}
            theme={collab.theme}
            link={`/programveckor/${collab.collaboration_id}`}
          />
        )}
      </ul>
    </section>
  );
}