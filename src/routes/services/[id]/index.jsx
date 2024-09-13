import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { features } from "@/data/properties";
import { Calendar } from "react-multi-date-picker";
import { useState } from "react";
import Button from "@/components/Button";

const API_URL = import.meta.env.VITE_API_URL;
const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

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
  const [seMuestra, setSeMuestra] = useState(false);

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
            <div className="flex gap-2">
              <Button
                onClick={() => setSeMuestra(!seMuestra)}
                variant="outline"
                size="medium"
              >
                Consultar disponiblidad
              </Button>
              <Button
                onClick={() => setSeMuestra(!seMuestra)}
                variant="primary"
                size="medium"
              >
                Reservar
              </Button>
            </div>

            {seMuestra && (
              <Calendar
                range
                rangeHover
                dateSeparator=" a "
                weekDays={weekDays}
                months={months}
                monthYearSeparator="|"
                format="DD/MM/YYYY"
                mapDays={({ date }) => {
                  let props = {};
                  if (
                    scheduledDates?.some(
                      (scheduledDate) =>
                        new Date(scheduledDate).toDateString() ===
                        new Date(date).toDateString(),
                    )
                  ) {
                    props.style = {
                      backgroundColor: "red",
                      color: "white",
                    };
                  }
                  return props;
                }}
                //onChange={handleDateChange}
              />
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
