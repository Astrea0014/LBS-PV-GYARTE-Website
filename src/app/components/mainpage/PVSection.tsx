import Button from "../general/Button";

export default function ProgramveckorSection(){

  return (

    <section className="p-16 flex xl:px-60 font-avenirRoman">

    
      <div className="flex flex-col items-center justify-center mb-8 md:px-5">
        <h2 className="font-bold text-3xl w-full text-center mb-4 font-avenirBlack">Programveckor</h2>
        <p className="mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus illo libero fugit obcaecati doloremque, modi, ex perferendis neque est nisi labore iusto temporibus eum aspernatur cumque optio ullam velit porro?</p>        

        <Button link="/programveckor" text="Mer" customClasses="bg-dark hover:bg-btnHoverDark w-40 font-bold text-light"/>
      </div>

      <picture className="md:block hidden"> {/*add lower resolution*/}
        <img src="/lbs-kreativa-gymnasiet.jpg" alt="Having fun at LBS" />
      </picture>

    </section>

  );

}