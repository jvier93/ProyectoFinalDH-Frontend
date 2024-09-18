import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import FormInput from "@/components/FormInput";
const API_URL = import.meta.env.VITE_API_URL;

async function loader({ params }) {
  const detailsResponse = await fetch(
    `${API_URL}/products/details/${params.id}`,
  );

  const details = await detailsResponse.json();

  return {
    details,
  };
}

const NewReservation = () => {
  const { details } = useLoaderData();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return "No date selected";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return { date: `${day}/${month}/${year}`, time: `${hours}:${minutes}` };
  };
  const queryParams = new URLSearchParams(location.search);
  const dateParam = queryParams.get("date");

  const { date, time } = formatDate(dateParam);

  const validationSchema = yup.object({
    address: yup
      .string()
      .min(5, "La dirección debe tener al menos 5 caracteres")
      .max(50, "La dirección no puede tener más de 50 caracteres")
      .required("Dirección es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      date: date,
      time: time,
      address: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          email: user?.email,
          productId: details?.id,
          reservationDate: dateParam,
          address: values.address,
        };

        const response = await fetch(`${API_URL}/reservations/new`, {
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
                   Servicio creado con éxito
                </p>

              `,
          confirmButtonColor: "#33B8AD",
        });

        navigate(`/reservations/all`);
      } catch (error) {
        console.error(`Error al guardar la reserva`);
        Swal.fire({
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
          icon: "error",
          html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al guardar la reserva.
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
    <main className="mx-auto mt-20 max-w-[1366px] text-textPrimary md:mt-28">
      <h1 className="text-center text-3xl lg:text-4xl">Detalle de reserva</h1>
      <section className="mx-auto flex max-w-[1366px] flex-col items-start gap-6 px-2 py-12 pb-12 lg:flex-row lg:gap-12">
        <div className="flex w-full flex-col gap-6 lg:w-1/2">
          <div className="space-y-2">
            <h5 className="text-2xl">Servicio</h5>

            <ServiceCard service={details} isViewOnly={true} />
          </div>
          <div className="space-y-2">
            <h5 className="text-2xl">Usuario</h5>
            <div>
              <p>Nombre: {user?.username}</p>
              <p>Email: {user?.email}</p>
            </div>
          </div>
        </div>

        <div className="w-full space-y-2 lg:w-1/2">
          <h5 className="text-2xl">Detalles</h5>
          <form className="flex flex-col gap-4">
            <FormInput
              type="text"
              id="date"
              disabled={true}
              placeholder="Fecha del servicio"
              label="Fecha"
              fieldProps={formik.getFieldProps("date")}
              errorMessage={formik.errors.date}
              showError={formik.touched.date && formik.errors.date}
            />
            <FormInput
              type="text"
              id="time"
              disabled={true}
              placeholder="Hora del servicio"
              label="Hora"
              fieldProps={formik.getFieldProps("time")}
              errorMessage={formik.errors.time}
              showError={formik.touched.time && formik.errors.time}
            />
            <FormInput
              type="text"
              id="address"
              placeholder="Dirección del usuario"
              label="Dirección"
              fieldProps={formik.getFieldProps("address")}
              errorMessage={formik.errors.address}
              showError={formik.touched.address && formik.errors.address}
            />
            <div className="pt-4">
              <Button
                onClick={formik.handleSubmit}
                variant="primary"
                size="medium"
              >
                Confirmar reserva
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

NewReservation.loader = loader;
export default NewReservation;
