import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

//Card for service on dashboard panel
const ServiceCard = ({ service }) => {
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
    <article className="flex bg-white border rounded-md gap-2 p-4">
      <img
        src={service?.urlImage}
        className="w-60 h-full object-cover rounded-md"
        alt="Service image"
      />
      <div className="w-full space-y-4 ">
        <div>
          <p className=" text-xl">{service?.name}</p>
          <p className="text-gray-500 font-light">{"Categoria"}</p>
        </div>

        <div className="mr-2 text-sm  text-left rounded-md flex p-2 gap-8  bg-gray-50">
          <div className="space-y-2">
            <p className=" text-gray-400">Caracteristicas</p>
            <p className="">{9}</p>
          </div>
          <div className="space-y-2">
            <p className=" text-gray-400">Precio</p>
            <p className="">{208}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/dashboard/service/${service?.id}/edit`}
            className="bg-primary  px-4 py-2 rounded-md text-white"
          >
            <FontAwesomeIcon size="xl" icon={faPenToSquare} />
          </Link>
          <button
            onClick={handleDeleteUser}
            className="bg-primary  px-4 py-2 rounded-md text-white"
          >
            <FontAwesomeIcon size="xl" icon={faTrash} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
