const Category = ({ category, width }) => {
  return (
    <article
      className={`w-{${width}px} inline-block h-full w-full rounded-md md:h-64`}
    >
      <div className="flex h-full flex-col items-center gap-2 md:flex-row md:items-stretch">
        <img
          src={category.urlImage}
          className="w-80 rounded-md object-cover"
          alt="Imagen de la categoria"
        />
        <div className="w-80 pl-0 md:w-full md:pl-4">
          <h5 className="py-4 text-2xl font-medium text-textPrimary md:text-3xl">
            {category.name}
          </h5>
          <p className="md:text-normal whitespace-normal text-sm">
            En esta categoría, encontrarás una amplia variedad de servicios
            diseñados para satisfacer tus necesidades de manera eficiente y
            profesional. Ya sea que busques soluciones tecnológicas,
            asesoramiento especializado, o cualquier otro tipo de servicio,
            nuestro objetivo es proporcionarte opciones de calidad.
          </p>
        </div>
      </div>
    </article>
  );
};

export default Category;
