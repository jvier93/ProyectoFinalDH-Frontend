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
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={id} className="text-gray-500">
        {label}
      </label>
      <div className="relative w-96 text-sm">
        {/* {Selected Features: tags} */}

        {/* Input */}
        <div
          className={`${
            errorMessage && showError ? "border border-red-500" : ""
          } flex w-96 items-center justify-between gap-2.5 rounded-md bg-white p-3 shadow-md`}
        >
          <FontAwesomeIcon className="text-primary" icon={faList} />
          <div className="flex flex-1 items-center">
            <input
              id={id}
              ref={inputRef}
              readOnly
              onClick={() => setMenuOpen(true)}
              onFocus={() => setMenuOpen(true)}
              onBlur={() => {
                setTouched("category", true);
                setMenuOpen(false);
              }}
              type="text"
              value={selectedOption?.name}
              // trimStart() is used to remove whitespace at the beginning of the input value each time the user types something.
              // This ensures that the input does not start with spaces, avoiding issues in validation or processing of the entered value.

              placeholder={placeholder}
              className="flex-1 cursor-pointer bg-transparent text-sm caret-primary outline-none"
            />
            <FontAwesomeIcon
              onClick={() => inputRef.current.focus()}
              className="cursor-pointer text-primary"
              icon={faChevronDown}
            />
          </div>
        </div>

        {/* Menu */}
        {menuOpen ? (
          <div className="absolute z-20 mt-2 flex max-h-52 w-full overflow-y-auto rounded-md bg-white p-1 shadow-md scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
            <ul className="w-full">
              {options?.length ? (
                options.map((option, i) => (
                  <li
                    className="flex w-full cursor-pointer rounded-md p-2 hover:bg-secondaryLight hover:text-primaryLight"
                    key={i}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setSelectedOption(id, option);
                      setMenuOpen(false);
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
        <span className="text-sm text-red-500">{errorMessage.name}</span>
      )}
    </div>
  );
};

export default SelectInput;
