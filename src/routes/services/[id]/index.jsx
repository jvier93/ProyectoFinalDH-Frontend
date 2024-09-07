import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Search from "@/components/Search";
import { properties } from "@/data/properties";
import { Calendar } from "react-multi-date-picker"
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { format, eachDayOfInterval, isWithinInterval } from 'date-fns';
import { es } from 'date-fns/locale';


const API_URL = import.meta.env.VITE_API_URL;

async function loader({ params }) {
  const detailsResponse = await fetch(
    `${API_URL}/products/details/${params.id}`
  );
  const serviceProperties = properties;

  const details = await detailsResponse.json();

  return {
    details,
    serviceProperties,
  };
}

const Detail = () => {
  const { details, serviceProperties } = useLoaderData();
  const [selectedDates, setSelectedDates] = useState([]);
  const { isLoggedIn } = useAuth();
  const [scheduledDates, setScheduledDates] = useState([]);
  
  

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
      }).then((result) => {
        if (result.isConfirmed) {
          setScheduledDates(prevDates => [...prevDates, ...selectedRange.map(date => date.toISOString())]);

          fetch(`${API_URL}/reservations/save`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dates: selectedRange.map(date => date.toISOString().split('T')[0]), productId: details.id })
          })
          .then(response => response.text())
          .then(data => {
            console.log(data);

          console.log("Servicio agendado para las fechas:", selectedDates);
          Swal.fire({
            title: '¡Éxito!',
            text: 'El servicio ha sido agendado.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        })
        .catch(error => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar la agenda',
            icon: 'error',
            confirmButtonText: 'Atrás'
          });
        });
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
            <span className="flex  items-end  text-white text-base pr-2 lg:pr-28 lg:text-3xl">
              {details.price}
            </span>
          </div>
        </div>

        <button className="absolute top-8 right-8">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-white sm:text-sm md:text-lg lg:text-2xl xl:text-4xl"
            onClick={handleGoBack}
          />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center text-primaryLight sm:text-sm md:text-lg lg:text-2xl my-4">
        Fechas disponibles
        <Calendar
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
        <button className="bg-primary my-6 px-10 py-3 rounded-2xl text-white" onClick={handleSchedule}>
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
              <div
                key={property.id}
                className="flex items-center  md:justify-center"
              >
                <FontAwesomeIcon
                  icon={property.icon}
                  className="text-xl md:text-2xl lg:text-3xl mx-4"
                  style={{ color: "#000000" }}
                />
                <p className="lg md:text-xl lg:text-2xl">{property.pname}</p>
              </div>
            ))
          ) : (
            <p>No hay características disponibles.</p>
          )}
        </div>
      </div>
      <div className="hidden md:block h-24 bg-primary"></div>
    </div>
  );
};

Detail.loader = loader;

export default Detail;
