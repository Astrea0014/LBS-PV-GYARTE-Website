import Modal from "./Modal";
import { useState } from "react";

// Function defenition -->
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
    setIsModalOpen(false);
}; 

// När du använder Modal componenet --> return (
  // VIKTIGT -> ELementet du vill ska öpna modalen ska du ge onClick={openModal()}
  <Modal isOpen={isModalOpen} handleClose={closeModal}>
    {/*Lägg till carousel componenent här! :)*/}
  </Modal>
//);

// Ta bort den här filen när du har implementerat den i din page :-))