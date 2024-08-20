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
    //Here we do not execute an action of react router because we do not changing any information, and actions are for change data.
    onSubmit: async (values) => {
      try {
        throw new Error("Usuario o contraseña incorrectos");
        // const response = await fetch(`${API_URL}/login`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(values),
        // });

        // if (!response.ok) {
        //   throw new Error("Usuario o contraseña incorrectos");
        // }

        // const data = await response.json();
        // await login(data);
        // navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Usuario o contrase;a incorrectos",
          showConfirmButton: false,
          timer: 2000,
        });
        // Swal.fire({
        //   icon: "error",
        //   title: "Error",
        //   text: error.message,
        // });
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
