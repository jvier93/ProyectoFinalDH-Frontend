import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const FormInput = ({
  type,
  id,
  label,
  fieldProps, // an array from formik of [name, value, handleChange, handleBlur]
  showError,
  placeholder,
  errorMessage,
  options, //for select, an array of {value, label}
}) => {
  const icons = {
    email: faEnvelope,
    password: faLock,
    repeatPassword: faLock,
    name: faUser,
    username: faUser,
    price: faDollarSign,
  };

  if (type === "select") {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-primaryLight" htmlFor={id}>
          {label}
        </label>
        <select
          className="bg-tertiary py-2 text-sm text-primaryLight"
          id={id}
          {...fieldProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {showError && (
          <span className="text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="text-gray-500" htmlFor={id}>
        {label}
      </label>
      <div
        className={`${
          errorMessage && showError ? "border border-red-500" : ""
        } flex w-full items-center justify-between gap-2.5 rounded-md bg-white p-3 shadow-md md:w-96`}
      >
        <FontAwesomeIcon className="text-primary" icon={icons[id]} />
        <input
          className="flex-1 bg-transparent text-sm caret-primary outline-none"
          placeholder={placeholder}
          id={id}
          type={type}
          {...fieldProps}
        />
      </div>

      {showError && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
