import DataGridContainer from "@/components/DataGridContainer";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ServiceCard from "../../../components/ServiceCard";

const API_URL = import.meta.env.VITE_API_URL;

const loader = async () => {
  try {
    const response = await fetch(`${API_URL}/products/random`);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const services = await response.json();
    console.log(services);

    return {
      services,
    };
  } catch (error) {
    Swal.fire({
      scrollbarPadding: false, // Disables extra space reserved for the scrollbar
      icon: "error",
      html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al intentar obtener los servicios.
              Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
            </p>
            
          `,
      footer: `
                   <details class="text-sm cursor-pointer text-gray-500">
                     <summary>Detalles del error</summary>
                     <p>Código de error: ${error}</p>
                   </details>
                 `,
      confirmButtonColor: "#33B8AD",
    });
    return { error: true };
  }
};

export default function Services() {
  const { services } = useLoaderData();

  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Administrar servicios
      </h1>
      <section className=" md:px-10 px-2 py-8 sm:px-6">
        <div className="w-full text-right pb-4">
          <Link
            to={"/dashboard/services/new"}
            className="rounded-full  bg-secondaryLight px-10 text-primaryLight"
          >
            Nuevo servicio
          </Link>
        </div>

        <DataGridContainer>
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </DataGridContainer>
      </section>
    </main>
  );
}

Services.loader = loader;
