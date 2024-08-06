const Service = ({ name, image }) => {
  return (
    <article
      className="w-[295px] h-[230px] inline-block bg-cover bg-center rounded-3xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h5 className="text-center text-sm py-4 bg-primary rounded-t-3xl text-white">
        {name}
      </h5>
    </article>
  );
};

export default Service;
