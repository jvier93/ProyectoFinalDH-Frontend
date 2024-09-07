import { Categories } from "../components/Categories";
import { FeaturedServices } from "../components/FeaturedServices";
import Search from "../components/Search";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

async function loader() {
  try {
    const categoriesResponse = await fetch(`${API_URL}/categories`);
    const servicesResponse = await fetch(`${API_URL}/products/random`);
    

    if (!categoriesResponse.ok || !servicesResponse.ok) {
      throw new Error("Error al traer los datos");
    }

    const categories = await categoriesResponse.json();

    const services = await servicesResponse.json();
    

    return {
      categories,
      services,
    };
  } catch (error) {
    Swal.fire({
      icon: "error",
      html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al intentar obtener los datos.
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
}

export default function Home() {
  const { categories, services } = useLoaderData();

  return (
    <main className=" mt-14  md:mt-20 ">
      <Search />
      {categories?.length > 0 && <Categories categories={categories} />}
      {categories?.length > 0 && <FeaturedServices services={services} />}
    </main>
  );
}

Home.loader = loader;
