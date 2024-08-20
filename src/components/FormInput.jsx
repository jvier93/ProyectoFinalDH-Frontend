const FormInput = ({
  type,
  id,
  label,
  fieldProps, // an array from formik of [name, value, handleChange, handleBlur]
  showError,
  placeholder,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-primaryLight text-center" htmlFor={id}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="bg-tertiary text-sm py-2 text-center text-primaryLight"
        id={id}
        type={type}
        {...fieldProps}
      />
      {showError && (
        <span className="text-red-500 text-sm text-center">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormInput;
