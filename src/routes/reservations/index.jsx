import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DataGridContainer from "@/components/DataGridContainer";
import { useAuth } from "@/hooks/useAuth";
import ReservationServiceCard from "../../components/ReservationServiceCard";

const API_URL = import.meta.env.VITE_API_URL;

const Reservations = () => {
  const { user } = useAuth(); // Obtén el email del usuario autenticado
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `${API_URL}/reservations/all/${user.email}`,
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();

        const browserOffsetInMilliseconds =
          new Date().getTimezoneOffset() * 60 * 1000;

        // Ajustar las fechas de las reservas a la zona horaria local
        const dataWithLocalTimeZone = data.map((reservation) => {
          const reservationDate = new Date(reservation.reservationDate);
          const adjustedDate = new Date(
            reservationDate.getTime() - browserOffsetInMilliseconds,
          );

          return {
            ...reservation,
            reservationDate: adjustedDate,
          };
        });

        setReservations(dataWithLocalTimeZone);
      } catch (error) {
        Swal.fire({
          scrollbarPadding: false,
          icon: "error",
          html: `
                <p class="text-sm text-gray-500 text-center font-Inter">
                  Hubo un problema al intentar obtener las reservas.
                  Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
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
      }
    };

    // Llamar a la función solo si hay un usuario autenticado
    if (user && user.email) {
      fetchReservations();
    }
  }, [user]);

  return (
    <div className="mx-auto mb-5 mt-20 max-w-[1366px] md:mt-28">
      <h1 className="py-10 text-center text-xl text-textPrimary lg:text-4xl">
        Mis Reservas
      </h1>
      <DataGridContainer>
        {reservations?.map((reservation) => (
          <ReservationServiceCard key={reservation.id} service={reservation} />
        ))}
      </DataGridContainer>
    </div>
  );
};

export default Reservations;
