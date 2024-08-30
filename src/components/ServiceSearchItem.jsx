import { Link } from "react-router-dom";

const ServiceSearchItem = ({
  service: { id, imageUrl, name, category },
  keyword,
}) => {
  const highlightMatch = (text, keyword) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<span class='bg-secondaryLight'>$1</span>");
  };

  return (
    <Link to={"/services/" + id}>
      <li className="p-1 bg-white hover:bg-gray-50  flex">
        <img
          src={imageUrl}
          className="w-44 md:w-60 hidden sm:block h-20 object-cover"
        />
        <div className="p-2">
          <p
            dangerouslySetInnerHTML={{
              __html: highlightMatch(name, keyword),
            }}
          />
          <p className="text-gray-500 font-light">{category}</p>
        </div>
      </li>
    </Link>
  );
};

export default ServiceSearchItem;
