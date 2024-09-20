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
        const response = await fetch(`${API_URL}/verify/user`, {
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
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
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
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
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
    <main className="mt-20 text-textPrimary md:mt-28">
      <section className="mx-auto max-w-[1366px] space-y-10 px-2">
        <h1 className="justify-center text-center text-xl lg:text-4xl">
          Activar cuenta
        </h1>
        <p>
          Hemos enviado un código de activación a {email}. Por favor ingrésalo a
          continuación para completar la activación.
        </p>
        <form
          className="mx-auto flex w-4/5 flex-col items-center gap-4 lg:w-1/3"
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
            className="mx-auto mt-8 w-fit rounded-lg bg-primary px-10 py-2 text-white hover:bg-teal-600 disabled:bg-tertiary disabled:text-primary"
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
