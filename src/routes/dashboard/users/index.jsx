import DataGridContainer from "@/components/DataGridContainer";
import { useLoaderData } from "react-router-dom";
import User from "@/components/User";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const loader = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const users = await response.json();

    return {
      users,
    };
  } catch (error) {
    Swal.fire({
      icon: "error",
      html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al intentar obtener los usuarios.
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

export default function Users() {
  const { users } = useLoaderData();

  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Administrar usuarios
      </h1>
      <section className="  md:px-10 px-2 py-8 sm:px-6">
        <DataGridContainer>
          {users?.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </DataGridContainer>
      </section>
    </main>
  );
}

Users.loader = loader;
