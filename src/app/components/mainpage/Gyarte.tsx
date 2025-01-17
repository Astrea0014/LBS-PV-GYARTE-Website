import Button from "../general/Button";

export default function GyarteSection(){
  return (

    <section className="bg-dark text-light p-10 md:p-16 xl:px-60 xl:flex min-h-60 font-avenirRoman">
    <div>
      <h2 className="font-bold text-3xl w-full text-center mb-4 font-avenirBlack">GymnasieArbete</h2>
      <p>Detta är ett arkiv över tidigare gymnasiearbeten utförda av elever vid LBS Kreativa Gymnasium Stockholm Södra. Här presenteras arbeten från flera av våra olika utbildningsprogram. Du kan bland annat hitta exempel på spelprogrammering från Spelutvecklingsprogrammet, webbplatser från programmet för App- och Webbutveckling. Samt imponerande bilder, kollage och videor skapade av elever från våra Estetiska program.</p>
    </div>

    <div className="flex flex-col justify-center items-center gap-5 mt-7 mb-8 m-20 xl:gap-9">
      <Button link="/teknikprogrammen" text="Teknikprogram" customClasses="bg-complementary hover:bg-btnHoverYl w-40 text-dark font-bold"/>
      <Button link="/estetprogrammen" text="Estetprogram" customClasses="bg-complementary hover:bg-btnHoverYl w-40 text-dark font-bold"/>
    </div>

    </section>

  );
}