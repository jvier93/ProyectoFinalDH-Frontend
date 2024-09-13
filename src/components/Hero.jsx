import { Link } from "react-router-dom";
import Button from "@/components/Button";

Link;
const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat text-white">
      <div className="inset-0 h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent">
        <div className="mx-auto flex h-full w-full max-w-[1366px] flex-col items-start justify-center">
          <div className="ml-0 flex flex-col gap-4 px-2 lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl">
              Servicios de Mantenimiento para el Hogar
            </h1>

            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium possimus pariatur ad, atque animi iste nam vero, sed,
              nesciunt commodi quam illum fuga recusandae tenetur. Tenetur
              numquam rerum totam laborum.
            </p>
            <Button variant="white" size="small" to={"/"}>
              Probalo Gratis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
