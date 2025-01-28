"use client";
import Header from "@/app/components/gyarte/GyarteHeader";
import Card from "@/app/components/general/Card";
import { useState, useEffect } from "react";


const aestheteData = {
  header : {
    bgImage: "/lbs-kreativa-gymnasiet-stockholm-sodra-1920x1080.jpg",
    focus: "Estetprogrammen",
  },
  cards: [
    {
      focus: "GRAFISK DESIGN",
      image: "/gyarte/lbs-grafisk-design-400x300.jpg",
      link: "/gymnasiearbeten?inriktning=GD",
    },
    {
      focus: "SPELGRAFIK",
      image: "/gyarte/lbs-spelgrafik-400x300.jpg",
      link: "/gymnasiearbeten?inriktning=SG",
    },
    {
      focus: "FOTO OCH FILM",
      image: "/gyarte/lbs-foto-och-film-400x300.jpg",
      link: "/gymnasiearbeten?inriktning=FF",
    },
    {
      focus: "MEDIA BETEENDE",
      image: "/gyarte/lbs-media-beteende-400x300.jpg",
      link: "/gymnasiearbeten?inriktning=MB",
    },
  ],
};

const techData = {
  header : {
    bgImage: "/gyarte/teknik.png",
    focus: "Tekikprogrammen",
  },
  cards: [
    {
      focus: "APP- OCH WEBBUTVECKLING",
      image: "/gyarte/lbs-app-och-webbutveckling-400x300.jpg",
      link: "/gymnasiearbeten?inriktning=SY",
    },
    {
      focus: "AI-UTBILDNING",
      image: "/gyarte/lbs-ai-utbildning-400x225.png",
      link: "/gymnasiearbeten?inriktning=AI",
    },
    {
      focus: "SPELUTVECKLING",
      image: "/gyarte/lbs-spelutveckling-400x300.jpg",
      link: "/gymnasiearbeten?inriktning=SU",
    },
  ],
};

interface FocusPageProps {
  params: Promise<{
    focus: string;
  }>
}

interface CardData {
  focus: string;
  image: string;
  link: string;
}

interface PageData {
  header: {
    bgImage: string;
    focus: string;
  }
  cards: CardData[];
}

export default function FocusPage({params}: FocusPageProps){
  const [pageData, setPageData] = useState<PageData | string>("Inga program för den inrikningen");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFocusData = async () => {
      try {
        const resolvedSearchParams = (await params).focus ?? "Unknown";
        console.log(params);
        if (resolvedSearchParams === "estet") {
          setPageData(aestheteData);
        } else if (resolvedSearchParams === "teknik") {
          setPageData(techData);
        }
      } catch (error) {
        return null;
      } finally {
        setIsLoading(false);
      }
    }
    getFocusData();
  }, [params]);

  return (
    <main>
      {!isLoading ? (
        <>
          {typeof pageData !== "string" ? (
            <div>
              <Header bgImage={pageData.header.bgImage} focus={pageData.header.focus} />
              <ul className="flex flex-wrap justify-center p-5 gap-20 my-16 mx-auto list-none" style={{maxWidth:"90rem"}}>
                {pageData.cards.map((card) => (
                  <Card
                    key={card.focus}
                    focus={card.focus}
                    image={card.image}
                    link={card.link}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="mx-auto flex justfy-center items-center w-full my-12 text-center">
              <h2 className="mx-auto text-center flex justify-center items-center">{pageData}</h2>
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto flex justfy-center items-center w-full my-12 text-center">
          <span className="mx-auto loading loading-spinner"/>
        </div>
      )}
    </main>
  );
}