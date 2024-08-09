import Service from "@/components/Service";


export const FeaturedServices = ( {services} ) => {

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const shuffledServices = shuffleArray(services);

  return (
    <>
      <div className="space-y-5 py-5 bg-white">
          <h1 className="text-center text-xl  text-primary lg:text-4xl">
            Servicios recomendados
          </h1>
         <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-8 max-w-screen-2xl mx-auto">{shuffledServices?.map((item, index) => {
            return <Service key={index} name={item.name} image={item.urlImage} id={item.id}/>
         })}</div>
      </div>
      
    </>
    
  );
};
