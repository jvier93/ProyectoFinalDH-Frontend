import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Search from "@/components/Search";

const API_URL = import.meta.env.VITE_API_URL;

async function loader({ params }) {
  const detailsResponse = await fetch(
    `${API_URL}/products/details/${params.id}`
  );

  const details = await detailsResponse.json();

  return {
    details,
  };
}

const Detail = () => {
  const { details } = useLoaderData();

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
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
      <div className="flex justify-center">
        <button className="bg-primary my-6 px-10 py-3 rounded-2xl text-white">
          Agendar servicio
        </button>
      </div>
    </div>
  );
};

Detail.loader = loader;

export default Detail;
