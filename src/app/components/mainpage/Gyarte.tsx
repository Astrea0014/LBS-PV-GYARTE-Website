import Button from "../general/Button";

export default function GyarteSection(){
  return (

    <section className="bg-dark text-light p-5 xl:px-60 xl:flex min-h-60">
    <div className="px-20">
      <h2 className="font-bold text-3xl w-full text-center mb-4">GymnasieArbete</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur alias ipsum, nostrum quas cupiditate provident tempore culpa tenetur sapiente consequuntur maxime ducimus soluta eligendi nobis perferendis placeat fugit. Quis, assumenda.</p>
    </div>

    <div className="flex flex-col justify-center items-center gap-5 mt-7 mb-8 m-20 xl:gap-9">
      <Button link="/teknikprogram" text="Teknikprogram" color="bg-complementary" hColor="hover:bg-btnHoverYl"/>
      <Button link="/estetprogram" text="Estetprogram" color="bg-complementary" hColor="hover:bg-btnHoverYl"/>
    </div>

    </section>

  );
}