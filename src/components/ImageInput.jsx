import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const ImageInput = ({
  image,
  label,
  errorMessage,
  setImage,
  setTouched,
  showError,
}) => {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (image) {
      if (typeof image === "string") {
        // if (typeof image === "string" && image.startsWith("http")) {
        // Si la imagen es una URL, usa la URL directamente para la previsualización
        setPreview(image);
      } else {
        // Si la imagen es un archivo, usa FileReader para previsualizarla
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          setPreview(reader.result);
        };
      }
    } else {
      setPreview(null); // Limpia la previsualización si no hay imagen
    }
  }, [image]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setTouched("image", true);
      setImage("image", e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleOnChange = () => {
    setTouched("image", true);
    setImage("image", inputRef.current.files[0]);
  };

  return (
    <div className="flex text-sm flex-col gap-1">
      <label className="text-gray-500">{label}</label>
      <div
        className={`${
          errorMessage && showError ? "border border-red-500" : ""
        } w-96 shadow-md flex bg-white flex-col   gap-4 rounded-md  text-sm justify-end p-2  `}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-[230px]   flex bg-white flex-col gap-4 rounded-md text-sm justify-center p-2 ${
            dragging ? "border-2 border-dashed border-primary" : ""
          }`}
        >
          {preview ? (
            <img
              src={preview}
              className="w-full h-full rounded-md object-cover "
              alt=""
            />
          ) : (
            <>
              <FontAwesomeIcon
                size="3x"
                className="text-primary"
                icon={faUpload}
              />
              <p className="text-center text-gray-400">
                Arrastra y suelta una imagen o usa el boton subir
              </p>
            </>
          )}
        </div>
        <input
          hidden
          accept="image/jpeg, image/png, image/jpg"
          id="inputFile"
          ref={inputRef}
          type="file"
          onChange={handleOnChange}
        />
        <label
          className="rounded-md flex gap-2.5 justify-center items-center text-center cursor-pointer w-full py-2 text-gray-500 bg-gray-50 border-gray-400 hover:bg-secondaryLight  "
          htmlFor="inputFile"
        >
          <span className="text-primary">Subir</span>
        </label>
      </div>
      {errorMessage && showError && (
        <div className="text-red-500 text-sm  ">{errorMessage}</div>
      )}
    </div>
  );
};

export default ImageInput;
