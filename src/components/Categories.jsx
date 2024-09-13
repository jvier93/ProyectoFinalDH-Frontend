import Slider from "@/components/Slider";

export const Categories = ({ categories }) => {
  return (
    <section className="space-y-10 bg-white py-10">
      <div className="mx-auto max-w-[1366px]">
        <Slider data={categories}></Slider>
      </div>
    </section>
  );
};
