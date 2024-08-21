import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import FormInput from "@/components/FormInput";

const Verify = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const validationSchema = Yup.object({
    verificationCode: Yup.string()
      .required("El código de activación es requerido")
      .min(6, "El código debe tener al menos 6 caracteres"),
  });

  const formik = useFormik({
    initialValues: { verificationCode: "" },
    validationSchema,
    onSubmit: async (values) => {
      const payload = { email, verificationCode: values.verificationCode };

      try {
        const response = await fetch(`${API_URL}/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(response.status);
        }
        Swal.fire({
          icon: "success",
          html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
             ¡Tu cuenta ha sido activada con éxito! Ahora puedes iniciar sesión con tus credenciales.
          </p>
           <p class="text-sm text-gray-500 text-center font-Inter">
             Serás redirigido automáticamente a la página de inicio de sesión.
          </p>
          
        `,
          confirmButtonColor: "#33B8AD",
        });

        navigate("/login");
        return null;
      } catch (error) {
        console.error(`Error ${error.message}`);
        Swal.fire({
          icon: "error",
          html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
            Hubo un problema al verificar tu cuenta.
            Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
          </p>
          
        `,
          footer: `
                 <details class="text-sm cursor-pointer text-gray-500">
                   <summary>Detalles del error</summary>
                   <p>Código de error: ${error.message.split(": ")[0]}</p>
                 </details>
               `,
          confirmButtonColor: "#33B8AD",
        });
      }
    },
  });

  return (
    <main className="mt-20 md:mt-28">
      <section className="px-2 space-y-10  md:px-12">
        <h1 className="text-center text-xl text-primary  lg:text-4xl">
          Activar cuenta
        </h1>
        <p>
          Hemos enviado un código de activación a {email}. Por favor ingrésalo a
          continuación para completar la activación.
        </p>
        <form
          className="flex  w-4/5 lg:w-1/3 mx-auto flex-col gap-4"
          onSubmit={formik.handleSubmit}
        >
          <FormInput
            type="text"
            id="verificationCode"
            label="Codigo"
            fieldProps={formik.getFieldProps("verificationCode")}
            errorMessage={formik.errors.verificationCode}
            showError={
              formik.touched.verificationCode && formik.errors.verificationCode
            }
          />

          <button
            className="px-10 mt-8 disabled:bg-tertiary disabled:text-primary hover:bg-teal-600 w-fit mx-auto rounded-lg py-2 bg-primary text-white"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Activando..." : "Activar"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Verify;
