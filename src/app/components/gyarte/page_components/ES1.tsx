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
      <ES1Fibonacci 
        image={`/${data.component_data.images[0].image_ref}`} 
        image2={`/${data.component_data.images[1].image_ref}`} 
        image3={`/${data.component_data.images[2].image_ref}`} 
        image4={`/${data.component_data.images[3].image_ref}`}
        longImage={`/${data.component_data.images[4].image_ref}`}
        openModal={openModal}
      />

      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <ImageCarousel imageRefList={[data.component_data.images[0].image_ref, data.component_data.images[1].image_ref, data.component_data.images[2].image_ref, data.component_data.images[3].image_ref, data.component_data.images[4].image_ref]}/>
      </Modal>
    </section>
  );  
}