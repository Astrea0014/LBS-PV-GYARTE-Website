import Button from "../general/Button";
import ImageTablet from "../../images/lbs-kreativa-gymnasiet.jpg";

export default function ProgramveckorSection(){

  return (

    <section className="p-5">

    
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="font-bold text-3xl w-full text-center mb-4">Programveckor</h2>
        <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus illo libero fugit obcaecati doloremque, modi, ex perferendis neque est nisi labore iusto temporibus eum aspernatur cumque optio ullam velit porro?</p>        

        <Button link="/programveckor" text="Mer" color="bg-dark" hColor="hover:bg-btnHoverDark"/>
      </div>

      <picture className="md:block hidden">
        <img src={ImageTablet.src} alt="Having fun at LBS" />
      </picture>

    </section>

  );

}