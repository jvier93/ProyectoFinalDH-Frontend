import Service from "@/components/Service";

export const FeaturedServices = ({ services }) => {
  return (
    <section id="featured-services" className="text-textPrimary py-10">
      <div className="mx-auto max-w-[1366px] space-y-10">
        <h1 className="text-center text-xl lg:text-4xl">
          Servicios recomendados
        </h1>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-4">
          {services?.map((item, index) => {
            return <Service key={index} service={item} />;
          })}
        </div>
      </div>
    </section>
  );
};
