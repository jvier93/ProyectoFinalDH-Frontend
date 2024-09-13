import { Link } from "react-router-dom";

const ServiceSearchItem = ({
  service: { id, urlImage, name, categoryName, setSearchOpen },
  keyword,
}) => {
  const highlightMatch = (text, keyword) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "gi");
    return text.replace(regex, "<span class='bg-secondaryLight'>$1</span>");
  };

  return (
    <Link onClick={() => setSearchOpen(false)} to={"/services/" + id}>
      <li className="flex bg-white p-1 hover:bg-gray-50">
        <img
          src={urlImage}
          className="hidden h-20 w-44 object-cover sm:block md:w-60"
        />
        <div className="p-2">
          <p
            dangerouslySetInnerHTML={{
              __html: highlightMatch(name, keyword),
            }}
          />
          <p className="font-light text-gray-500">{categoryName}</p>
        </div>
      </li>
    </Link>
  );
};

export default ServiceSearchItem;
