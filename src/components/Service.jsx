import { Link } from "react-router-dom";

const Service = ({ service }) => {
  return (
    <div>
      <article className="flex h-[400px] w-72 flex-col gap-8 rounded-md bg-white bg-cover bg-center pt-8 shadow-sm hover:shadow-lg">
        <img
          src={service.urlImage}
          className="h-48 w-full rounded-md object-cover px-4"
          alt="Imagen del servicio"
        />
        <div className="flex flex-col gap-4">
          <p className="px-2 text-center">{service.name}</p>
          <span className="mx-auto w-1/3 border-[1px] border-[#D1D1D1]"></span>
          <div className="flex flex-col gap-2">
            <p className="px-2 text-center text-sm">
              Precio <span className="font-bold">$UYU </span>
              <span className="font-bold text-primary"> 200</span>
            </p>
            <Link
              className="mx-auto w-fit rounded-md border border-gray-400 px-6 text-gray-500 transition-colors hover:border-primary hover:bg-white hover:text-primary"
              to={"/services/" + service.id}
            >
              Ver servicio
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Service;
