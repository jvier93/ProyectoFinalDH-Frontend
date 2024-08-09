import { Link } from "react-router-dom";

const Service = ({ name, image, id }) => {
  return (
    <Link to={"/service/" + id}>
    <article
      className="w-[295px] h-[230px] inline-block bg-cover bg-center rounded-3xl"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h5 className="text-center text-sm py-4 bg-primary rounded-t-3xl text-white">
        {name}
      </h5>
    </article>
    </Link>
  );
};

export default Service;
