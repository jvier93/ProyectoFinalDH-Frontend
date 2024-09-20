import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faDollarSign,
  faHouse,
  faCalendarDay,
  faClock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const FormInput = ({
  type,
  id,
  label,
  fieldProps, // an array from formik of [name, value, handleChange, handleBlur]
  showError,
  placeholder,
  errorMessage,
  disabled,
}) => {
  const icons = {
    email: faEnvelope,
    password: faLock,
    repeatPassword: faLock,
    name: faUser,
    username: faUser,
    price: faDollarSign,
    address: faHouse,
    date: faCalendarDay,
    time: faClock,
    verificationCode: faCheck,
  };

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label className="text-gray-500" htmlFor={id}>
        {label}
      </label>
      <div
        className={`${disabled ? "cursor-not-allowed" : ""} ${
          errorMessage && showError ? "border border-red-500" : ""
        } flex w-full items-center justify-between gap-2.5 rounded-md bg-white p-3 shadow-md md:w-96`}
      >
        <FontAwesomeIcon className="text-primary" icon={icons[id]} />
        <input
          className={`${disabled ? "cursor-not-allowed" : ""} flex-1 bg-transparent text-sm caret-primary outline-none`}
          placeholder={placeholder}
          disabled={disabled}
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
