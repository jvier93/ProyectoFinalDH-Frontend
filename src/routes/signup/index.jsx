import { useLayoutEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "@/components/FormInput";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Signup() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { user } = useAuth();

  useLayoutEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        Swal.fire({
          scrollbarPadding: false,
          icon: "warning",
          html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
                Buen intento!, pero seras redirigido al inicio
            </p> 
          `,
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          navigate("/");
        });
      }, 1000);

      return () => clearTimeout(timer);
      }
  }, [user, navigate]);

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(15, "El nombre no puede tener más de 15 caracteres")
      .required("Nombre es requerido"),
    email: yup.string().email("Email inválido").required("Email es requerido"),
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula",
      )
      .matches(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula",
      )
      .matches(/\d/, "La contraseña debe contener al menos un número")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "La contraseña debe contener al menos un carácter especial",
      )
      .required("Contraseña es requerida"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
      .required("Repetir contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = { ...values };
      delete payload.repeatPassword;

      try {
        const response = await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        navigate("/verify", { state: { email: values.email } });
        return null;
      } catch (error) {
        console.error(`Error ${error.message}`);
        Swal.fire({
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
          icon: "error",
          html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
            Hubo un problema al crear tu cuenta.
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
        Crear cuenta
      </h1>
      <form
        className="mx-auto flex w-4/5 flex-col gap-4 py-10 md:items-center lg:w-1/3"
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
          type="password"
          id="password"
          fieldProps={formik.getFieldProps("password")}
          label="Contraseña"
          errorMessage={formik.errors.password}
          showError={formik.touched.password && formik.errors.password}
        />
        <FormInput
          type="password"
          id="repeatPassword"
          fieldProps={formik.getFieldProps("repeatPassword")}
          label="Repetir contraseña"
          errorMessage={formik.errors.repeatPassword}
          showError={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
        />
        <button
          className="mx-auto mt-8 w-fit rounded-lg bg-primary px-10 py-2 text-white hover:bg-teal-600 disabled:bg-tertiary disabled:text-primary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </main>
  );
}
