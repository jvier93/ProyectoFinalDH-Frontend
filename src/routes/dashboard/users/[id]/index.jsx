import { useLoaderData, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "@/components/FormInput";
import Swal from "sweetalert2";
import SelectInput from "@/components/SelectInput";

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
      scrollbarPadding: false, // Disables extra space reserved for the scrollbar
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
    role: yup.object({
      name: yup
        .string()
        .oneOf(["ADMIN", "CLIENT"], "Rol inválido")
        .required("Rol es requerido"),
    }),
  });

  const userRole = userDetails?.roles[0].match(/name=([A-Z]+)/)[1];
  function RoleNameToUserRoleId(roleName) {
    switch (roleName) {
      case "ADMIN":
        return 2;
      case "CLIENT":
        return 1;
      default:
        return null;
    }
  }

  const formik = useFormik({
    initialValues: {
      id: userDetails?.id,
      username: userDetails?.username,
      email: userDetails?.email,
      role: { name: userRole },
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(
          `${API_URL}/users/update-roles?userId=${values.id}&roleIds=${RoleNameToUserRoleId(values.role.name)}`,
          {
            method: "PUT",
          },
        );

        if (!response.ok) {
          throw new Error(response.status);
        }
        Swal.fire({
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
          icon: "success",
          html: `
                <p class="text-sm text-gray-500 text-center font-Inter">
                   Usuario actualizado con éxito
                </p>

              `,
          confirmButtonColor: "#33B8AD",
        });

        navigate("/dashboard/users");
        return null;
      } catch (error) {
        console.error(`Error ${error.message}`);
        Swal.fire({
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
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
      <h1 className="text-center text-xl text-primary lg:text-4xl">
        Actualizar usuario
      </h1>
      <form
        className="mx-auto flex w-4/5 flex-col items-center gap-4 py-10 lg:w-1/3"
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
        <SelectInput
          id="role"
          label="Rol"
          options={[{ name: "ADMIN" }, { name: "CLIENT" }]}
          selectedOption={formik.values.role}
          setTouched={formik.setFieldTouched}
          setSelectedOption={formik.setFieldValue}
          errorMessage={formik.errors.role}
          showError={formik.touched.role && formik.errors.role}
        />

        <button
          className="mx-auto mt-8 w-fit rounded-lg bg-primary px-10 py-2 text-white hover:bg-teal-600 disabled:bg-tertiary disabled:text-primary"
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
