import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const TextareaInput = ({
  type,
  id,
  label,
  fieldProps, // an array from formik of [name, value, handleChange, handleBlur]
  showError,
  placeholder,
  errorMessage,
}) => {
  return (
    <div className="flex text-sm flex-col gap-1">
      <label className="text-gray-500" htmlFor={id}>
        {label}
      </label>
      <div
        className={`${
          errorMessage && showError ? "border border-red-500" : ""
        } bg-white  shadow-md  rounded-md flex justify-between  p-3 w-96 gap-2.5`}
      >
        <FontAwesomeIcon className="pt-1 text-primary" icon={faPen} />
        <textarea
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

export default TextareaInput;
