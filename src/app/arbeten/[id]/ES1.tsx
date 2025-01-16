"use client";

import ESXOverview from "@/app/components/gyarte/GyarteESXOverview";
import ES1Fibonacci from "@/app/components/gyarte/GyarteES1FibonacciLayout";
import ImageCarousel from "@/app/components/gyarte/ImageCarousel";
import Modal from "@/app/components/general/Modal/Modal";
import { useState } from "react";

interface ES1Props {
  data: any;
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
        image={`/${data.work.component_data[0].image_ref}`} 
        image2={`/${data.work.component_data[1].image_ref}`} 
        image3={`/${data.work.component_data[2].image_ref}`} 
        image4={`/${data.work.component_data[3].image_ref}`}
        longImage={`/${data.work.component_data[4].image_ref}`}
        openModal={openModal}
      />

      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <ImageCarousel imageRefList={[data.work.component_data[0].image_ref, data.work.component_data[1].image_ref, data.work.component_data[2].image_ref, data.work.component_data[3].image_ref]}/>
      </Modal>
    </section>
  );  
}