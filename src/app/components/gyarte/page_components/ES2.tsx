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
      <ESXOverview description={null}/>
      <ES2Fibonacci 
        video={`/${data.component_data.video_ref}`}
        image={`/${data.component_data.images[0].image_ref}`} 
        image2={`/${data.component_data.images[1].image_ref}`} 
        image3={`/${data.component_data.images[2].image_ref}`} 
        image4={`/${data.component_data.images[3].image_ref}`}
        openModal={openModal}
      />

      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <ImageCarousel imageRefList={[data.component_data.images[0].image_ref, data.component_data.images[1].image_ref, data.component_data.images[2].image_ref, data.component_data.images[3].image_ref]}/>
      </Modal>
    </section>
  );  
}