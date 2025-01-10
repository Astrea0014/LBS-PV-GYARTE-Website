import Logo from "../../images/lbsLogo.gif"
import Divider from "../general/Divider"

export default function Footer(){

  return(

    <footer className="bg-footer text-textLight flex justify-center flex-col items-center gap-3 min-h-96
    xl:
    ">
      
      
      <img src={Logo.src} alt="lbs-logo" className="w-52"/>
      
      <Divider responsive = {true} />
      <a href="https://lbs.se/stockholmsodra/" className="hover:cursor-pointer hover:text-complementary">Till Huvudsidan</a>
      <Divider responsive = {true} />
      
      <section className="text-center">
        <p>Kontakt</p>
        <p>Email: stockholm@lbs.se</p>        
      </section>


      <Divider responsive = {true} />

      <span className="w-11/12 text-center">© 2025-30XX MCEWwA. | All Rights Reserved</span>

    </footer>

  );

}