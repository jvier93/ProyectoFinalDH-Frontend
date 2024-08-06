import Slider from "@/components/Slider";
import { categories } from "@/data/categories";

export const Categories = () => {
  return (
    <section className="bg-white space-y-10 pt-10">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Categorias disponibles
      </h1>
      <Slider data={categories}></Slider>
      <div className="h-16 bg-primary"></div>
    </section>
  );
};
