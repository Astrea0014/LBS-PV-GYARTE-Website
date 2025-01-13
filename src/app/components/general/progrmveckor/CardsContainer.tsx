"use client"
import { useState, useEffect } from "react";
import ProgramWeekCard from "./ProgramWeekCard"; 

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
        "description": "This is a collaboration 2!!",
        "collaborators": [
          "AW",
        ]
      },
      {
        "collaboration_id": 3,
        "year": 2025,
        "theme": "Mänskliga Rättigheter",
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
        "description": "This is a collaboration 4!!",
        "collaborators": [
          "GD",
        ]
      }
    ]
  };

  const collaborations = testInfo.collaborations;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 w-11/12 lg:w-10/12 xl:w-8/12 mx-auto my-24 place-items-center flex-wrap">
      {testInfo.collaborations.map((collab) =>
        <ProgramWeekCard 
          key={collab.collaboration_id}
          collaberators={collab.collaborators}
          posterSrc="/spelutv.jpg"
          theme={collab.theme}
        />
      )
      }
    </section>
  );
}
