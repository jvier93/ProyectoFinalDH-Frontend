import { useLoaderData, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "@/components/FormInput";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

async function loader({ params }) {
  try {
    const response = await fetch(`${API_URL}/users/details/${params.id}`);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const userDetails = await response.json();

    return { userDetails };
  } catch (error) {
    Swal.fire({
      icon: "error",
      html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al intentar obtener el usuario.
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

export default function UserDetail() {
  const { userDetails } = useLoaderData();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(15, "El nombre no puede tener más de 15 caracteres")
      .required("Nombre es requerido"),
    email: yup.string().email("Email inválido").required("Email es requerido"),
    role: yup
      .string()
      .oneOf(["1", "2"], "Rol inválido") // Valida que el rol sea uno de los valores permitidos
      .required("Rol es requerido"), // Asegura que el rol es obligatorio
  });

  const userRole = userDetails?.roles[0].match(/name=([A-Z]+)/)[1];
  function mapUserRoleNameToUserRoleId(roleName) {
    switch (roleName) {
      case "ADMIN":
        return 1;
      case "CLIENT":
        return 2;
      default:
        return null;
    }
  }

  const formik = useFormik({
    initialValues: {
      id: userDetails?.id,
      username: userDetails?.username,
      email: userDetails?.email,
      role: mapUserRoleNameToUserRoleId(userRole),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `${API_URL}/users/update-roles?userId=${values.id}&roleIds=${values.role}`,
          {
            method: "PUT",
          }
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        navigate("/dashboard/users");
        return null;
      } catch (error) {
        console.error(`Error ${error.message}`);
        Swal.fire({
          icon: "error",
          html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
            Hubo un problema al actualizar el usuario.
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
      }
    },
  });

  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Actualizar usuario
      </h1>
      <form
        className="flex py-10 w-4/5 lg:w-1/3 mx-auto flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <FormInput
          type="text"
          id="username"
          label="Nombre"
          fieldProps={formik.getFieldProps("username")}
          errorMessage={formik.errors.username}
          showError={formik.touched.username && formik.errors.username}
        />
        <FormInput
          type="email"
          id="email"
          fieldProps={formik.getFieldProps("email")}
          label="Email"
          errorMessage={formik.errors.email}
          showError={formik.touched.email && formik.errors.email}
        />
        <FormInput
          type="select"
          id="role"
          fieldProps={formik.getFieldProps("role")}
          label="Rol"
          errorMessage={formik.errors.role}
          showError={formik.touched.role && formik.errors.role}
          options={[
            { value: "1", label: "ADMIN" },
            { value: "2", label: "CLIENT" },
          ]}
        />
        <button
          className="px-10 mt-8 disabled:bg-tertiary disabled:text-primary hover:bg-teal-600 w-fit mx-auto rounded-lg py-2 bg-primary text-white"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Guardando cambios..." : "Actualizar usuario"}
        </button>
      </form>
    </main>
  );
}

UserDetail.loader = loader;
