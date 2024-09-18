import { useState, useRef, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import useSWR from "swr";
import ServiceSearchItem from "./ServiceSearchItem";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

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

const Search = ({ searchOpen, setSearchOpen }) => {
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const modalRef = useRef(null);

  const {
    data: services = [],
    error,
    isValidating,
  } = useSWR(`${API_URL}/products/all`, fetcher);

  useEffect(() => {
    if (services && search) {
      const filteredResults = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase()),
      );
      if (JSON.stringify(filteredResults) !== JSON.stringify(filteredData)) {
        setFilteredData(filteredResults);
      }
    } else {
      if (services.length !== filteredData.length) {
        setFilteredData(services);
      }
    }
  }, [search, services, filteredData]);

  // Cerrar el modal si se hace clic fuera del área principal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen, setSearchOpen]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (!dropDownOpen) setDropDownOpen(true);
  };

  useEffect(() => {
    if (document) {
      document.documentElement.style.overflow = searchOpen
        ? "hidden"
        : "scroll";
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  return (
    <section className={`absolute z-50 h-screen w-full space-y-10 bg-black/50`}>
      <div ref={modalRef} className="h-28 w-full bg-slate-100">
        <form className="mx-auto flex h-full w-full max-w-[1366px] flex-col items-center justify-center gap-2 px-2 md:flex-row md:px-0">
          <div className="flex w-full cursor-pointer items-center gap-2.5 rounded-md bg-white p-2.5 shadow-md lg:w-3/6 xl:w-1/3">
            <FontAwesomeIcon
              className="cursor-pointer text-primary"
              icon={faCalendar}
            />
            <DatePicker
              format="DD-MM-YYYY"
              placeholder="Selecciona una fecha"
              value={date}
              dateSeparator=" - "
              onChange={handleDateChange}
              range={true}
              inputClass="bg-transparent cursor-pointer text-sm w-full  caret-primary outline-none"
              containerStyle={{
                width: "100%",
              }}
            />
          </div>
          <div
            onMouseLeave={() => {
              if (dropDownOpen) setDropDownOpen(false);
            }}
            className="flex w-full items-center gap-2.5 rounded-md bg-white p-3 shadow-md"
          >
            <input
              onClick={() => setDropDownOpen(true)}
              type="text"
              value={search}
              onChange={handleSearchChange}
              className="flex-1 bg-transparent text-sm caret-primary outline-none"
              placeholder="¿Qué servicio necesitas?"
            />
            <FontAwesomeIcon
              className="text-primary"
              icon={faMagnifyingGlass}
            />
          </div>
          {/* Mostrar los resultados filtrados en base a la búsqueda */}
          {search && (
            <ul className="absolute top-28 flex h-64 w-full flex-col gap-1 overflow-y-scroll rounded-b-md bg-white p-1 scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
              {isValidating && <Spinner />}

              {error && (
                <p className="py-1 text-center text-sm">
                  Al parecer hubo un error al realizar la búsqueda, inténtalo
                  nuevamente.
                </p>
              )}

              {filteredData.length === 0 && !error && !isValidating && (
                <p className="py-1 text-center text-sm">
                  No se encontraron resultados
                </p>
              )}

              {!isValidating &&
                filteredData &&
                filteredData.map((service, index) => (
                  <ServiceSearchItem
                    service={service}
                    setSearchOpen={setSearchOpen}
                    key={index}
                    keyword={search}
                  />
                ))}
            </ul>
          )}
        </form>
      </div>
    </section>
  );
};

export default Search;
