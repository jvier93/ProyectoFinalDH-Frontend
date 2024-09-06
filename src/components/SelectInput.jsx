import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faChevronDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

const SelectInput = ({
  id,
  label,
  options,
  selectedOption,
  placeholder,
  setTouched,
  setSelectedOption,
  errorMessage,
  showError,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef();

  return (
    <div className="flex flex-col text-sm gap-1 ">
      <label htmlFor={id} className="text-gray-500 ">
        {label}
      </label>
      <div className="relative w-96  text-sm">
        {/* {Selected Features: tags} */}

        {/* Input */}
        <div
          className={`${
            errorMessage && showError ? "border border-red-500" : ""
          } bg-white  shadow-md  rounded-md flex justify-between items-center p-3 w-96 gap-2.5`}
        >
          <FontAwesomeIcon className="text-primary" icon={faList} />
          <div className="flex-1 flex items-center">
            <input
              id={id}
              ref={inputRef}
              readOnly
              onFocus={() => setMenuOpen(true)}
              onBlur={() => {
                setTouched("category", true);
                setMenuOpen(false);
              }}
              type="text"
              value={selectedOption.name}
              // trimStart() is used to remove whitespace at the beginning of the input value each time the user types something.
              // This ensures that the input does not start with spaces, avoiding issues in validation or processing of the entered value.

              placeholder={placeholder}
              className="bg-transparent text-sm flex-1 cursor-pointer  caret-primary outline-none "
            />
            <FontAwesomeIcon
              onClick={() => inputRef.current.focus()}
              className="text-primary cursor-pointer"
              icon={faChevronDown}
            />
          </div>
        </div>

        {/* Menu */}
        {menuOpen ? (
          <div className="absolute z-20 bg-white shadow-md rounded-md w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50">
            <ul className="w-full">
              {options?.length ? (
                options.map((option, i) => (
                  <li
                    className="p-2 cursor-pointer flex hover:bg-secondaryLight rounded-md w-full hover:text-primaryLight"
                    key={i}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelectedOption("category", option);
                    }}
                  >
                    <span className="flex-1">{option.name}</span>
                    {selectedOption?.name?.includes(option.name) && (
                      <FontAwesomeIcon
                        className="text-primary"
                        icon={faCheck}
                      />
                    )}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">
                  No hay opciones para seleccionar
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
      {showError && (
        <span className="text-red-500 text-sm ">{errorMessage}</span>
      )}
    </div>
  );
};

export default SelectInput;
