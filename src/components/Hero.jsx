import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";

Link;
const Hero = () => {
  const { user } = useAuth();

  return (
    <section className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-cover bg-no-repeat text-white">
      <div className="inset-0 h-full bg-gradient-to-r from-black/80 via-black/40 to-transparent">
        <div className="mx-auto flex h-full w-full max-w-[1366px] flex-col items-start justify-center">
          <div className="ml-0 flex flex-col gap-4 px-2 lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl">
              Servicios de Mantenimiento para el Hogar
            </h1>

            <p>
              Tu hogar, en las mejores manos. Brindamos servicios de
              mantenimiento confiables y rápidos, para que disfrutes de un
              espacio siempre cuidado.
            </p>
            {!user && (
              <Button variant="white" to={"/signup"} size="small">
                Probalo Gratis
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
