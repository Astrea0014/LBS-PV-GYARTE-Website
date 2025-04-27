"use client";
import ESXOverview from "@/app/components/gyarte/GyarteESXOverview";
import ES2Fibonacci from "@/app/components/gyarte/GyarteES2FibonacciLayout";
import ImageCarousel from "@/app/components/gyarte/ImageCarousel";
import Modal from "@/app/components/general/Modal/Modal";
import { useState } from "react";
import { Thesis } from "@/app/lib/DbTypes";

interface ES2Props {
  data: Thesis;
}

export default function ES2({ data }: ES2Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <ESXOverview description={null} />

      <ES2Fibonacci 
        video={`/${data.component_data.video_ref}`}
        image={data.component_data.images[0]?.image_ref ? `/${data.component_data.images[0].image_ref}` : undefined} 
        image2={data.component_data.images[1]?.image_ref ? `/${data.component_data.images[1].image_ref}` : undefined} 
        image3={data.component_data.images[2]?.image_ref ? `/${data.component_data.images[2].image_ref}` : undefined} 
        image4={data.component_data.images[3]?.image_ref ? `/${data.component_data.images[3].image_ref}` : undefined}
        openModal={openModal}
      />

      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <ImageCarousel 
          imageRefList={data.component_data.images
            .slice(0, 4)
            .filter((img : any) => !!img?.image_ref)
            .map((img : any)=> img.image_ref)}
        />
      </Modal>
    </section>
  );  
}
