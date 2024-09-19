import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const User = ({ user }) => {
  const roleName = user.roles[0].match(/name=([A-Z]+)/)[1];
  console.log(roleName);

  const handleDeleteUser = () => {
    Swal.fire({
      icon: "warning",
      html: `
        <p class="text-sm text-gray-500 text-center font-Inter">
            Funcionalidad no disponible
        </p>
      `,
      scrollbarPadding: false, // Disables extra space reserved for the scrollbar
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <article className="w-full space-y-4 rounded-md border bg-white p-4">
      <div>
        <p className="text-xl">{user.username}</p>
        <p className="font-light text-gray-500">{user.email}</p>
      </div>

      <div className="mr-2 flex gap-8 rounded-md bg-gray-50 p-2 text-left text-sm">
        <div className="space-y-2">
          <p className="text-gray-400">Rol</p>
          <p className="">{roleName}</p>
        </div>
        <div className="space-y-2">
          <p className="text-gray-400">Activado</p>
          <p className="">{user.enabled ? "Sí" : "No"}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          to={`/dashboard/users/${user.id}/edit`}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          <FontAwesomeIcon size="xl" icon={faPenToSquare} />
        </Link>
        <button
          onClick={handleDeleteUser}
          className="rounded-md bg-primary px-4 py-2 text-white"
        >
          <FontAwesomeIcon size="xl" icon={faTrash} />
        </button>
      </div>
    </article>
  );
};

export default User;
