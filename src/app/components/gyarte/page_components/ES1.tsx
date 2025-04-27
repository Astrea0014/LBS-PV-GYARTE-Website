"use client";

import ESXOverview from "@/app/components/gyarte/GyarteESXOverview";
import ES1Fibonacci from "@/app/components/gyarte/GyarteES1FibonacciLayout";
import ImageCarousel from "@/app/components/gyarte/ImageCarousel";
import Modal from "@/app/components/general/Modal/Modal";
import { useState } from "react";
import { Thesis } from "@/app/lib/DbTypes";

interface ES1Props {
  data: Thesis;
}

export default function ES1({ data }: ES1Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <ESXOverview description={null}/>

      {data.component_data.images.length > 0 ? (
        <>
          <ES1Fibonacci 
            image={data.component_data.images[0]?.image_ref ? `/${data.component_data.images[0].image_ref}` : undefined} 
            image2={data.component_data.images[1]?.image_ref ? `/${data.component_data.images[1].image_ref}` : undefined} 
            image3={data.component_data.images[2]?.image_ref ? `/${data.component_data.images[2].image_ref}` : undefined} 
            image4={data.component_data.images[3]?.image_ref ? `/${data.component_data.images[3].image_ref}` : undefined}
            longImage={data.component_data.images[4]?.image_ref ? `/${data.component_data.images[4].image_ref}` : undefined}
            openModal={openModal}
          />
          <Modal isOpen={isModalOpen} handleClose={closeModal}>
            <ImageCarousel 
              imageRefList={data.component_data.images
                .slice(0, 5)
                .map((img: any) => img?.image_ref)
                .filter(Boolean)}
            />
          </Modal>
        </>
      ) : (
        <span className="mx-auto flex justify-center items-center text-center">
          Inga bilder laddade
        </span>
    )}

  </section>
  );  
}