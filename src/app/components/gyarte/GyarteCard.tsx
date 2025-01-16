

interface GyarteCardProps {
  thesis : string,
  name : string | null,
  course : string | null,
  year : number
}

export default function GyarteCard({thesis, name, course, year} : GyarteCardProps){

  return(

    <div className="cursor-pointer bg-dark text-light hover:bg-complementary hover:text-dark m-4 mt-10 md:mx-20 lg:mx-52 hover:scale-105 p-4 transition flex flex-col items-center hover:underline">

      <div className="h-32 w-full">
        {thesis.length < 120 ? (
            <h1 className="font-semibold lg:text-xl" style={{hyphens:"auto"}}>{thesis}</h1>        
          ) : (
          <div>
            <div className="overflow-hidden h-24 lg:h-20">
              <h1 className="font-semibold lg:text-xl" style={{hyphens:"auto"}}>{thesis}</h1>              
            </div>
            <span className="font-bold md:hidden lg:block">...</span>            
          </div>
        )}   
      </div>

      <div className="grid grid-cols-12 w-full justify-end flex-1 items-center h-10">
        <div className="flex col-span-10 gap-2">
          <p>{name}</p>
          <p>{course}</p>
        </div>
        <p className="justify-self-end col-span-2 items-center">{year}</p>
      </div>

    </div>

  );
}