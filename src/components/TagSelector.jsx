import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const TagSelector = ({
  features,
  id,
  selectedFeatures,
  setSelectedFeatures,
}) => {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef();

  const filteredTags = features.filter(
    (item) =>
      item?.name
        .toLocaleLowerCase()
        ?.includes(query.toLocaleLowerCase().trim()) &&
      !selectedFeatures.includes(item?.name)
  );

  return (
    <div className="flex flex-col text-sm gap-1 ">
      <label htmlFor={id} className="text-gray-500 ">
        Caracteristicas
      </label>
      <div className="relative w-96  text-sm">
        {/* {Selected Features: tags} */}
        {selectedFeatures.length ? (
          <div className="bg-white w-96  text-xs flex flex-wrap gap-1 p-2 mb-2">
            {selectedFeatures.map((feature) => (
              <div
                className="rounded-full w-fit px-3 py-1.5 border  text-gray-500 bg-gray-50 border-gray-400 flex gap-2 items-center "
                key={feature}
              >
                {feature?.name}

                <FontAwesomeIcon
                  // onMouseDown to prevent losing focus and thus avoid closing the dropdown

                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setSelectedFeatures(
                      "features",
                      selectedFeatures.filter((item) => item !== feature)
                    );
                  }}
                  className="cursor-pointer hover:text-primary"
                  icon={faXmark}
                />
              </div>
            ))}
            <div className="w-full text-right">
              <span
                onClick={() => {
                  setSelectedFeatures("features", []);
                  inputRef.current?.focus();
                }}
                className="text-gray-400 hover:text-primary cursor-pointer"
              >
                quitar todos
              </span>
            </div>
          </div>
        ) : null}
        {/* Input */}
        <div className="bg-white  shadow-md  rounded-md flex justify-between items-center p-3 w-96 gap-2.5 ">
          <FontAwesomeIcon className="text-primary" icon={faMagnifyingGlass} />
          <input
            id={id}
            ref={inputRef}
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            type="text"
            value={query}
            // trimStart() is used to remove whitespace at the beginning of the input value each time the user types something.
            // This ensures that the input does not start with spaces, avoiding issues in validation or processing of the entered value.

            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Buscar caracteristicas"
            className="bg-transparent text-sm flex-1  caret-primary outline-none "
          />
        </div>

        {/* Menu */}
        {menuOpen ? (
          <div className="absolute bg-white shadow-md rounded-md w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50">
            <ul className="w-full">
              {filteredTags?.length ? (
                filteredTags.map((tag, i) => (
                  <li
                    className="p-2 cursor-pointer hover:bg-secondaryLight rounded-md w-full hover:text-primaryLight"
                    key={i}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelectedFeatures("features", [
                        ...selectedFeatures,
                        tag,
                      ]);
                    }}
                  >
                    {tag?.name}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No hay tags</li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TagSelector;
