const Search = () => {
  return (
    <section className="h-[235px] space-y-10 py-10 bg-primary">
      <h1 className="text-center text-xl  text-white lg:text-4xl">
        Busca los servicios que necesites
      </h1>

      <form className="flex flex-col lg:flex-row  items-center justify-center gap-10">
        <input
          className="placeholder-secondary w-3/5 lg:w-2/5 py-2 text-center"
          placeholder="¿Que servicio necesitas?"
        ></input>
        <button className="rounded-full  bg-secondaryLight px-20 text-primaryLight">
          Buscar
        </button>
      </form>
    </section>
  );
};

export default Search;
