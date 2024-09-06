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
    name: faUser,
    username: faUser,
    price: faDollarSign,
  };

  if (type === "select") {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-primaryLight " htmlFor={id}>
          {label}
        </label>
        <select
          className="bg-tertiary text-sm py-2  text-primaryLight"
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
          <span className="text-red-500 text-sm ">{errorMessage}</span>
        )}
      </div>
    );
  }
  return (
    <div className="flex text-sm flex-col gap-1">
      <label className="text-gray-500" htmlFor={id}>
        {label}
      </label>
      <div
        className={`${
          errorMessage && showError ? "border border-red-500" : ""
        } bg-white  shadow-md  rounded-md flex justify-between items-center p-3 w-96 gap-2.5`}
      >
        <FontAwesomeIcon
          className="text-primary"
          icon={icons[fieldProps.name]}
        />
        <input
          className="bg-transparent text-sm flex-1  caret-primary outline-none "
          placeholder={placeholder}
          id={id}
          type={type}
          {...fieldProps}
        />
      </div>

      {showError && (
        <span className="text-red-500 text-sm ">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
