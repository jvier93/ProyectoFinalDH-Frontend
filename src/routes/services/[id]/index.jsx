import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Search from "@/components/Search";
import { Calendar } from "react-multi-date-picker"
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { format, eachDayOfInterval, isWithinInterval, isBefore } from 'date-fns';
import { es } from 'date-fns/locale';
import iconMap from "../../../data/iconMap";



const API_URL = import.meta.env.VITE_API_URL;
const today = new Date();

async function loader({ params }) {
  const detailsResponse = await fetch(
    `${API_URL}/products/details/${params.id}`
  );
  const details = await detailsResponse.json();

  const scheduledDates = details.reservations.map(reservation => reservation.date)

  const propertiesResponse = await fetch(`${API_URL}/characteristics`)
  const serviceProperties = await propertiesResponse.json();
  

  return {
    details,
    serviceProperties,
    scheduledDates,
  };
}

const Detail = () => {
  const { details, serviceProperties, scheduledDates } = useLoaderData();
  const [selectedDates, setSelectedDates] = useState([today]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSchedule = () => {

    if (isLoggedIn) {

      const [startDate, endDate] = selectedDates;
      const selectedRange = endDate
          ? eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) })
          : [new Date(startDate)];


    if (selectedRange.some(date => isBefore(date, today) || date.toDateString() === today.toDateString())) {
      Swal.fire({
        title: 'Error',
        text: 'No se pueden seleccionar hoy, ni fechas anteriores a hoy',
        icon: 'error',
        confirmButtonText: 'Atrás',
      });
      return;
    }


    const hasConflict = selectedRange.some((date) => {
      return scheduledDates.some((scheduled) => {
        if (typeof scheduled === 'string') {
          const scheduledDate = new Date(scheduled);
          return scheduledDate.toDateString() === date.toDateString();
        }

        const scheduledStart = new Date(scheduled.start);
        const scheduledEnd = new Date(scheduled.end);
        
        return isWithinInterval(date, { start: scheduledStart, end: scheduledEnd });
    });
    });
      
    if (hasConflict) {
      Swal.fire({
        title: 'Error',
        text: 'Algunas de las fechas seleccionadas ya están agendadas',
        icon: 'error',
        confirmButtonText: 'Atrás',
      });
    } else {
        Swal.fire({
          title: 'Confirmar agenda',
          text: `¿Deseas agendar el servicio para las fechas: ${selectedDates.map(date => format(new Date(date), 'dd/MM/yyyy', { locale: es })).join(' a ')}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, agendar',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
                const response = await fetch(`${API_URL}/products/details`, {
                method: 'POST',
                headers: {
                 'Content-Type': 'application/json',
                },
               body: JSON.stringify({ dates: selectedRange.map(date => date.toISOString().split('T')[0]),  productId: details.id })
              });

              if (response.ok) {
                Swal.fire({
                  title: '¡Éxito!',
                  text: 'El servicio ha sido agendado.',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
              } else {
                  Swal.fire({
                    title: 'Error',
                    text: 'No se pudo guardar la agenda. Inténtalo de nuevo',
                    icon: 'error',
                    confirmButtonText: 'Atrás'
                  });
                }
            } catch (error) {
                Swal.fire({
                  title:'Error',
                  text: 'No se pudo conectar con el servidor. Inténtalo de nuevo',
                  icon: 'error',
                  confirmButtonText: 'Atrás'
              });
            }
          }
        });
      } 
    } else {
        Swal.fire({
          title: 'Ups!',
          text: 'Debes estar logueado para agendar el servicio',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancelar'
      
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          navigate('/login');
        }, 500);
       }
      });
    }
  };

  const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

  const handleDateChange = (dates) => {
    if (dates.length === 2) {
      setSelectedDates(dates.map(date => new Date(date)));
  } else {
      setSelectedDates([new Date(dates[0])]);
  }
  };

  return (
    <div className="  mt-14 md:mt-20 ">
      <Search />
      <div className="flex justify-center items-center h-32">
        <h2 className="text-xl lg:text-4xl text-primaryLight ">
          Detalle del servicio
        </h2>
      </div>

      <div className="flex h-16 bg-primary"></div>
      {details ? (
        <h3 className="text-xl text-center p-8 text-primaryLight lg:text-4xl">
          {details.categoryName}
        </h3>
      ) : (
        <p className="text-xl text-primaryLight lg:text-4xl">
          Categoría no encontrada.
        </p>
      )}

      <div className="mx-auto max-w-[1227px] px-4 py-8 lg:px-10 relative flex flex-col bg-primary justify-center rounded-full ">
        <h3 className="text-xl   text-white lg:text-4xl">{details.name}</h3>
        <div className="flex pt-2 gap-4 lg:gap-8   ">
          <img
            className="rounded-3xl w-32 lg:w-96"
            src={details.urlImage}
            alt=""
          />

          <div className="flex items-end  gap-2 flex-col">
            <article className="flex-grow text-white text-xs lg:text-2xl">
              {details.description}
            </article>
            <span className="flex items-end text-white text-base pr-2 lg:pr-28 lg:text-3xl">
              {details.price}
            </span>
          </div>
        </div>

        <button className="absolute px-0.5 top-8 right-8 rounded-full hover:bg-secondaryLight">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-white hover:text-primary sm:text-sm md:text-lg lg:text-2xl xl:text-4xl"
            onClick={handleGoBack}
          />
        </button>
      </div>
      <div className="flex flex-col space-y-4 items-center text-primaryLight sm:text-sm md:text-lg lg:text-3xl my-4">
        <p>Fechas disponibles</p>
        <Calendar
        numberOfMonths={2}
        range
        rangeHover
        dateSeparator= " a "
        weekDays={weekDays}
        months={months}
        monthYearSeparator="|"
        format="DD/MM/YYYY"
        mapDays={({ date }) => {
          let props = {};
          if (scheduledDates.some((scheduledDate) => new Date(scheduledDate).toDateString() === new Date(date).toDateString())) {
            props.style = {
              backgroundColor: "red",
              color: "white",
            };
          }
          return props;
        }}
        onChange={handleDateChange}
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-primary my-6 px-10 py-3 rounded-2xl text-white hover:bg-secondary" onClick={handleSchedule}>
          Agendar servicio
        </button>
      </div>
      <div className="h-96 text-primaryLight">
        <h3 className="flex ml-20  text-xl lg:text-4xl">
          Características del Servicio
        </h3>
        <div className="grid mt-12 grid-cols-2 items-center lg:grid-cols-3 gap-y-6">
          {serviceProperties.length > 0 ? (
            serviceProperties.map((property) => (
              <>
                <div
                  key={property.id}
                  className="flex flex-col items-center md:justify-center"
                >
                  <FontAwesomeIcon
                    icon={iconMap[property.name]}
                    className="text-xl md:text-2xl lg:text-4xl mx-4"
                    style={{ color: "#000000" }}
                  />

                  <p className="text-lg md:text-xl lg:text-2xl">{property.name}</p>
                  <p>{property.description}</p>
                </div>
              </>
            ))
          ) : (
            <p className="text-xl text-center bg-red-300">No existen características para este servicio</p>
          )}
        </div>
      </div>
      <div className="hidden md:block h-24 bg-primary"></div>
    </div>
  );
};

Detail.loader = loader;

export default Detail;
