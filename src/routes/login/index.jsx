import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "@/components/FormInput";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email("Email inválido").required("Email es requerido"),
    password: yup.string().required("Contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = { ...values };

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        const userSessionData = await response.json();
        login(userSessionData);
        return null;
      } catch (error) {
        console.error(`Error ${error.message}`);

        if (error.message == 403) {
          Swal.fire({
            icon: "error",
            html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Usuario o contraseña incorrectos.
            </p>
            
          `,
            footer: `
                   <details class="text-sm cursor-pointer text-gray-500">
                     <summary>Detalles del error</summary>
                     <p>Código de error: ${error.message}</p>
                   </details>
                 `,
            confirmButtonColor: "#33B8AD",
          });
        } else {
          Swal.fire({
            icon: "error",
            html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al iniciar sesion.
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
      }
    },
  });

  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Iniciar sesion
      </h1>
      <form
        className="flex py-10 w-4/5 lg:w-1/3 mx-auto flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <FormInput
          type="email"
          id="email"
          fieldProps={formik.getFieldProps("email")}
          label="Email"
          errorMessage={formik.errors.email}
          showError={formik.touched.email && formik.errors.email}
        />
        <FormInput
          type="password"
          id="password"
          fieldProps={formik.getFieldProps("password")}
          label="Contraseña"
          errorMessage={formik.errors.password}
          showError={formik.touched.password && formik.errors.password}
        />

        <button
          className="px-10 mt-8  disabled:bg-tertiary disabled:text-primary hover:bg-teal-600 w-fit mx-auto rounded-lg py-2 bg-primary text-white"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Iniciar Sesion
        </button>
      </form>
    </main>
  );
}
