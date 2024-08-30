import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import useSWR from "swr";
import ServiceSearchItem from "./ServiceSearchItem";
import Spinner from "./Spinner";

const Search = () => {
  // Función para filtrar los datos
  const fetcher = (search, date) => {
    // Simula una llamada a una API o una búsqueda de datos
    const data = [
      {
        id: 1,
        imageUrl: "/images/services/calefaccion.jpeg",
        name: "Calefacción",
        price: 150.0,
        category: "Category 1",
      },
      {
        id: 2,
        imageUrl: "/images/services/cambioCables.png",
        name: "Cambio de Cables",
        price: 50.0,
        category: "Category 1",
      },
      {
        id: 3,
        imageUrl: "/images/services/destapeCaños.jpg",
        name: "Destape de Caños",
        price: 80.0,
        category: "Category 3",
      },
      {
        id: 4,
        imageUrl: "/images/services/griferia.jpeg",
        name: "Grifería",
        price: 70.0,
        category: "Category 3",
      },
      {
        id: 5,
        imageUrl: "/images/services/limpiezaAlfombra.jpg",
        name: "Limpieza de Alfombra",
        price: 60.0,
        category: "Category 3",
      },
      {
        id: 6,
        imageUrl: "/images/services/pinturaParedes.png",
        name: "Pintura de Paredes",
        price: 120.0,
        category: "Category 2",
      },
      {
        id: 7,
        imageUrl: "/images/services/pisos.jpg",
        name: "Pisos",
        price: 200.0,
        category: "Category 3",
      },
      {
        id: 8,
        imageUrl: "/images/services/plomeria.jpg",
        name: "Plomería",
        price: 100.0,
        category: "Category 3",
      },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredData = data.filter((item) => {
          return item.name.includes(search[0]);
        });

        resolve(filteredData);
      }, 1000); // Simula un retraso en la respuesta
    });
  };

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(true);

  const {
    data: searchResults = [],
    error,
    isValidating,
  } = useSWR([search, date], fetcher);

  //onchange date function
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (!dropDownOpen) setDropDownOpen(true);
  };

  return (
    <section className=" px-2 md:px-12 text-white space-y-10 py-10 bg-primary">
      <h1 className="text-center text-xl   ">
        Busca los servicios que necesites
      </h1>
      <p>
        Puedes seleccionar un rango de fechas y en base a eso buscar servicios
        disponibles segun las palabras claves requeridas
      </p>
      <div className="relative">
        <form className="flex text-black w-full md:w-3/4  mx-auto flex-col lg:flex-row  items-center justify-center gap-2">
          <div className="w-full lg:w-3/6 xl:w-1/3 ">
            <DatePicker
              format="DD-MM-YYYY" // Este formato es similar al que se muestra en un input de tipo date
              placeholder="Selecciona una fecha"
              value={date}
              dateSeparator=" - "
              onChange={handleDateChange}
              range={true}
              inputClass=" placeholder-secondary  w-full text-center py-2  rounded-sm   "
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
              placeholder="¿Que servicio necesitas?"
            ></input>

            {/* Show modal results when search text is not empty and dropdown is open */}
            {search && dropDownOpen && (
              <ul className="absolute rounded-b-md overflow-y-scroll p-1 flex flex-col gap-1   w-full h-64 bg-secondaryLight ">
                {isValidating && <Spinner />}

                {error && (
                  <p className="text-sm text-center py-1">
                    Al parecer hubo un error al realizar la busqueda, intentalo
                    nuevamente.
                  </p>
                )}

                {searchResults.length === 0 && !error && !isValidating && (
                  <p className="text-sm text-center py-1">
                    No se encontraron resultados
                  </p>
                )}
                {!isValidating &&
                  searchResults &&
                  searchResults.map((service, index) => (
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
