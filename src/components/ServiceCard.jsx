import Swal from "sweetalert2";
import Button from "@/components/Button";

//Card for service on dashboard panel
const ServiceCard = ({ service, isViewOnly }) => {
  console.log(service);
  
  const handleDeleteUser = () => {
    Swal.fire({
      scrollbarPadding: false, // Disables extra space reserved for the scrollbar
      icon: "warning",
      html: `
        <p class="text-sm text-gray-500 text-center font-Inter">
            Funcionalidad no disponible
        </p> 
      `,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <article className="flex gap-2 rounded-md border bg-white p-4">
      <img
        src={service?.urlImage}
        className="hidden h-full w-60 rounded-md object-cover md:block"
        alt="Service image"
      />
      <div className="w-full space-y-4">
        <div>
          <p className="text-xl">{service?.name}</p>
          <p className="font-light text-gray-500">{"Categoria"}</p>
        </div>

        <div className="mr-2 flex gap-8 rounded-md bg-gray-50 p-2 text-left text-sm">
          <div className="space-y-2">
            <p className="text-gray-400">Caracteristicas</p>
            <p className="">{service?.characteristics.length}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-400">Precio</p>
            <p className="">{service?.price}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isViewOnly ? (
            <Button variant="primary" to={`/dashboard/services/${service?.id}`}>
              ver
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                to={`/dashboard/service/${service?.id}/edit`}
              >
                editar
              </Button>
              <Button onClick={handleDeleteUser} variant="primary">
                eliminar
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
