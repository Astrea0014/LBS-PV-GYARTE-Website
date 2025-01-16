import Divider from "../general/Divider"

export default function Footer(){

  return(

    <footer className="bg-footer text-light flex justify-center flex-col items-center gap-3 min-h-96 font-avenirRoman">
      
      
      <img src="/lbslogorgbvit.svg" alt="lbs-logo" className="w-52"/>
      
      <Divider responsive = {true} />
      <a href="https://lbs.se/stockholmsodra/" className="hover:cursor-pointer hover:text-complementary hover:font-avenirBlack">Till Huvudsidan</a>
      <Divider responsive = {true} />
      
      <section className="text-center">
        <p className="font-avenirBlack">Kontakt</p>
        <p>Email: <span className="font-avenirBlack">stockholm@lbs.se</span></p>        
      </section>


      <Divider responsive = {true} />

      <span className="w-11/12 text-center">© 2025-30XX MCEWwA. | All Rights Reserved</span>

    </footer>

  );

}