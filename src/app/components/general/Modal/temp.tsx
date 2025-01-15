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
  <Modal isOpen={isModalOpen} handleClose={closeModal}>
    {/*Lägg till carousel componenent här! :)*/}
  </Modal>
//);

// Ta bort den här filen när du har implementerat den i din page :-))