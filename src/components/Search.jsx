import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import useSWR from "swr";
import ServiceSearchItem from "./ServiceSearchItem";
import Spinner from "./Spinner";

const API_URL = import.meta.env.VITE_API_URL;

// Función fetcher para obtener los datos desde el endpoint `products/all`
const fetcher = (url) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al obtener los datos");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
    });

const Search = () => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const {
    data: services = [],
    error,
    isValidating,
  } = useSWR(`${API_URL}/products/all`, fetcher);

  // filter data when user writes
  useEffect(() => {
    if (services && search) {
      const filteredResults = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(services); //if no results, show all
    }
  }, [search, services]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (!dropDownOpen) setDropDownOpen(true);
  };

  return (
    <section className="px-2 md:px-12 text-white space-y-10 py-10 bg-primary">
      <h1 className="text-center text-xl">Busca los servicios que necesites</h1>
      <p>
        Puedes seleccionar un rango de fechas y en base a eso buscar servicios
        disponibles según las palabras claves requeridas
      </p>
      <div className="relative">
        <form className="flex text-black w-full md:w-3/4 mx-auto flex-col lg:flex-row items-center justify-center gap-2">
          <div className="w-full lg:w-3/6 xl:w-1/3">
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="Selecciona una fecha"
              value={date}
              dateSeparator=" - "
              onChange={handleDateChange}
              range={true}
              inputClass="placeholder-secondary w-full text-center py-2 rounded-sm"
              containerStyle={{
                width: "100%",
              }}
            />
          </div>
          <div
            onMouseLeave={() => {
              if (dropDownOpen) setDropDownOpen(false);
            }}
            className="relative w-full"
          >
            <input
              onClick={() => setDropDownOpen(true)}
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="placeholder-secondary w-full rounded-sm py-2 text-center"
              placeholder="¿Qué servicio necesitas?"
            />

            {/* Mostrar los resultados filtrados en base a la búsqueda */}
            {search && dropDownOpen && (
              <ul className="absolute rounded-b-md overflow-y-scroll p-1 flex flex-col gap-1 w-full h-64 bg-secondaryLight">
                {isValidating && <Spinner />}

                {error && (
                  <p className="text-sm text-center py-1">
                    Al parecer hubo un error al realizar la búsqueda, inténtalo
                    nuevamente.
                  </p>
                )}

                {filteredData.length === 0 && !error && !isValidating && (
                  <p className="text-sm text-center py-1">
                    No se encontraron resultados
                  </p>
                )}

                {!isValidating &&
                  filteredData &&
                  filteredData.map((service, index) => (
                    <ServiceSearchItem
                      service={service}
                      key={index}
                      keyword={search}
                    />
                  ))}
              </ul>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
