import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { features } from "@/data/properties";
import { useState } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//Calendar locale import
import { es } from "date-fns/locale";

const API_URL = import.meta.env.VITE_API_URL;

async function loader({ params }) {
  const detailsResponse = await fetch(
    `${API_URL}/products/details/${params.id}`,
  );
  const serviceProperties = features;

  const details = await detailsResponse.json();

  const scheduledDates = details.reservations.map(
    (reservation) => reservation.date,
  );

  return {
    details,
    serviceProperties,
    scheduledDates,
  };
}

const Detail = () => {
  const { details, serviceProperties, scheduledDates } = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();

  //Include es language to calendar
  registerLocale("es", es);

  const hoursRange = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const [showAvailabilityCalendar, setShowAvailabilityCalendar] =
    useState(false);

  //Functions to calendar

  const getFullyBookedDays = (reservations) => {
    const groupedByDay = {};
    reservations.forEach((reservation) => {
      const bookingDate = new Date(reservation);

      const dateKey = bookingDate.toDateString();

      if (!groupedByDay[dateKey]) {
        groupedByDay[dateKey] = [];
      }
      groupedByDay[dateKey].push(bookingDate.getHours());
    });
    return Object.keys(groupedByDay)
      .filter((dateKey) => {
        const hoursBooked = groupedByDay[dateKey];
        return hoursRange.every((hour) => hoursBooked.includes(hour));
      })
      .map((dateKey) => new Date(dateKey));
  };
  const getReservedTimesForDay = (date, reservations) => {
    return reservations.filter((reservation) => {
      const bookedDate = new Date(reservation);
      return bookedDate.toDateString() === date.toDateString();
    });
  };
  const isAvailableHour = (date) => {
    const excludeTimes = getReservedTimesForDay(date, scheduledDates);
    const excludeTimesHours = excludeTimes.map((dateString) => {
      const date = new Date(dateString); // Convertir cadena a Date
      return date.getHours(); // Obtener la hora
    });

    const dateHours = date.getHours();

    //if hour from our selected date is NOT present on exludeTimes it is an available hour
    //if hour from our selected date is present on hoursRange it is an available hour
    return (
      !excludeTimesHours.includes(dateHours) && hoursRange.includes(dateHours)
    );
  };
  const firstAvailableHour = (date) => {
    const excludeTimes = getReservedTimesForDay(date, scheduledDates);
    const excludeTimesHours = excludeTimes.map((dateString) => {
      const date = new Date(dateString); // Convertir cadena a Date
      return date.getHours(); // Obtener la hora
    });

    const firstAvailableHour = hoursRange.find((hour) => {
      return !excludeTimesHours.includes(hour);
    });

    return firstAvailableHour;
  };
  const handleDateChange = (date) => {
    let selectedDate = date;
    if (!isAvailableHour(date)) {
      selectedDate.setHours(firstAvailableHour(date), 0, 0, 0);
    }

    setSelectedDate(selectedDate);
  };
  const handleCheckAvailability = () => {
    if (!user) {
      Swal.fire({
        scrollbarPadding: false, // Disables extra space reserved for the scrollbar
        icon: "warning",
        html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
              Debe estar logueado para poder consultar la disponibilidad
          </p> 
        `,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    setShowAvailabilityCalendar(!showAvailabilityCalendar);
  };
  const handleBooking = () => {
    if (!user) {
      Swal.fire({
        scrollbarPadding: false, // Disables extra space reserved for the scrollbar
        icon: "warning",
        html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
              Debe estar logueado para poder reservar
          </p>
        `,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    if (!selectedDate) {
      Swal.fire({
        scrollbarPadding: false, // Desactiva el espacio reservado para la barra de desplazamiento
        icon: "warning",
        html: `
          <p class="text-sm text-gray-500 text-center font-Inter">
            Debe seleccionar una fecha.
          </p>
        `,
        footer: `
          <p class="text-sm text-gray-500">
            Presione "Consultar disponibilidad" para verificar fechas disponibles.
          </p>
          
        `,
        confirmButtonColor: "#33B8AD",
        showConfirmButton: false,
        timer: 5000,
      });

      return;
    }

    navigate(
      `/reservations/${details?.id}/new?date=${encodeURIComponent(selectedDate.toISOString())}`,
    );
  };

  //Calendar properties
  const minTime = new Date();
  minTime.setHours(9, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(20, 0, 0);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [selectedDate, setSelectedDate] = useState(null);
  const fullyBookedDays = getFullyBookedDays(scheduledDates);

  const excludeTimes = getReservedTimesForDay(
    selectedDate || new Date(),
    scheduledDates,
  );

  return (
    <main className="mt-8 bg-white pt-20 text-textPrimary md:mt-24">
      <section
        id="service_detail"
        className="mx-auto max-w-[1366px] space-y-12 px-2 pb-12 lg:px-0"
      >
        <p className="lg:text-normal text-sm text-gray-500">
          <Link className="hover:text-primary" to={"/"}>
            Home
          </Link>{" "}
          /{" "}
          <Link className="hover:text-primary" to={"/"}>
            Servicios
          </Link>{" "}
          / {details?.name}
        </p>
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="space-y-8 lg:w-1/2">
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl">{details?.name}</h1>
              <p className="text-gray-500">{details?.categoryName}</p>
            </div>
            <p>{details?.description}</p>
            <p className="text-xl">
              Precio <span className="font-bold">$UYU </span>
              <span className="font-bold text-primary"> {details?.price}</span>
            </p>
            <div className="flex gap-2 pb-2">
              <Button
                onClick={handleCheckAvailability}
                variant="outline"
                size="medium"
                id="checkAvailability"
              >
                Consultar disponiblidad
              </Button>

              <Button
                onClick={handleBooking}
                variant="primary"
                size="medium"
                id="booking"
              >
                Reservar
              </Button>
            </div>

            {showAvailabilityCalendar && (
              <DatePicker
                inline
                selected={selectedDate}
                locale="es"
                showTimeSelect
                onClickOutside={(event) => {
                  const targetId = event.target.id;

                  if (
                    targetId === "checkAvailability" ||
                    targetId === "booking"
                  ) {
                    return;
                  }

                  setShowAvailabilityCalendar(false);
                }}
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Hora"
                // This function checks if a given date is not fully booked by comparing it to an array of fully booked dates (fullyBookedDays).
                // It returns true if the date is available (not in fullyBookedDays) and false if the date is fully booked.
                //False results are tagged disabled on calendar
                filterDate={(date) => {
                  return !fullyBookedDays.some(
                    (bookedDate) =>
                      bookedDate.toDateString() === date.toDateString(),
                  );
                }}
                excludeTimes={excludeTimes}
                highlightDates={fullyBookedDays}
                minDate={tomorrow}
                minTime={minTime}
                maxTime={maxTime}
                onChange={handleDateChange}
              ></DatePicker>
            )}
          </div>
          <div className="lg:w-1/2">
            <img
              className="h-96 w-full rounded-md object-cover"
              src={details?.urlImage}
              alt=""
            />
          </div>
        </div>
      </section>
      <div className="bg-slate-100">
        <section
          id="service_features"
          className="mx-auto max-w-[1366px] space-y-12 px-2 py-12 lg:px-0"
        >
          <h2 className="text-3xl lg:text-4xl">Caracteristicas</h2>
          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            {serviceProperties?.map((property) => (
              <div
                key={property.id}
                className="flex h-32 w-80 gap-4 rounded-md bg-white p-4 shadow-md"
              >
                <FontAwesomeIcon
                  className="pt-2 text-primary"
                  size="2xl"
                  icon={property?.icon}
                ></FontAwesomeIcon>
                <div className="space-y-2">
                  <p className="">{property?.name}</p>
                  <p className="text-sm">{property?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

Detail.loader = loader;

export default Detail;
