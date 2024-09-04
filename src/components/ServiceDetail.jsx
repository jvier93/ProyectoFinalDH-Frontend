import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";
import TagSelector from "@/components/TagSelector";
import TextareaInput from "@/components/Textareainput";
import ImageInput from "@/components/ImageInput";
import SelectInput from "@/components/SelectInput";

const API_URL = import.meta.env.VITE_API_URL;

const loader = async ({ params }) => {
  try {
    const featuresResponse = await fetch("/api/features");
    const categoriesResponse = await fetch("/api/categories");
    const serviceResponse = await fetch(
      `${API_URL}/service/details/${params.id}`
    );
    if (!featuresResponse.ok || !categoriesResponse.ok || !serviceResponse.ok) {
      throw new Error("Error al traer los datos");
    }

    const features = await featuresResponse.json();
    const categories = await categoriesResponse.json();
    const service = await serviceResponse.json();

    return {
      features,
      categories,
      service,
    };
  } catch (error) {
    Swal.fire({
      scrollbarPadding: false, // Disables extra space reserved for the scrollbar
      icon: "error",
      html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al intentar obtener las categorias y caracteristicas de los servicios.
              Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
            </p>
            
          `,
      footer: `
                   <details class="text-sm cursor-pointer text-gray-500">
                     <summary>Detalles del error</summary>
                     <p>Error: ${error}</p>
                   </details>
                 `,
      confirmButtonColor: "#33B8AD",
    });
    return { error: true };
  }
};

export default function ServiceDetail() {
  //const {features, categories, service} = useLoaderData()
  const navigate = useNavigate();
  const service = {
    name: "Servicio de prueba",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    features: ["Tutoriales", "Cursos", "Noticias", "Foros", "Viajes"],
    category: "Tutoriales",
    price: 100,
    imageUrl: "/images/services/calefaccion.jpeg",
  };
  const features = [
    "Tutoriales",
    "Cursos",
    "Noticias",
    "Foros",
    "Viajes",
    "Comunidad",
    "Juegos",
    "Deportes",
    "Música",
  ];

  const categories = [
    "Tutoriales",
    "Cursos",
    "Noticias",
    "Foros",
    "Viajes",
    "Comunidad",
    "Juegos",
    "Deportes",
    "Música",
  ];

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(15, "El nombre no puede tener más de 50 caracteres")
      .required("Nombre es requerido"),
    price: yup
      .number()
      .required("Precio es requerido")
      .min(1, "El precio debe ser mayor a 0"),
    description: yup
      .string()
      .required("Descripción es requerida")
      .min(20, "La descripción no puede tener menos de 20 caracteres")
      .max(50, "La descripción no puede tener más de 50 caracteres"),
    category: yup
      .string()
      .oneOf([...categories], "Categoria inválida") // Valida que el rol sea uno de los valores permitidos
      .required("La categoria es requerida"), // Asegura que el rol es obligatorio
    image: yup
      .mixed()
      .required("La imagen del servicio es requerida")
      .test(
        "fileType",
        "Solo se permiten imágenes JPG, JPEG o PNG",
        (value) => {
          // If the value is a string that starts with 'http', it indicates that the image is provided by the server
          //and not by the user in this case of course, the value is considered valid

          if (typeof value === "string" && value.startsWith("http")) {
            return true;
          }
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: service?.name,
      description: service?.description,
      category: service?.category,
      features: [...service.features] || [],
      price: service?.price,
      image: service?.imageUrl,
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = { ...values };

      try {
        const response = await fetch(`${API_URL}/services/new`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(response.status);
        }

        Swal.fire({
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
          icon: "success",
          html: `
                <p class="text-sm text-gray-500 text-center font-Inter">
                   Servicio creado con éxito
                </p>
                
              `,
          confirmButtonColor: "#33B8AD",
        });
        navigate("/dashboard/services");
      } catch (error) {
        console.error(`Error al crear el servicio ${error.message}`);
        Swal.fire({
          scrollbarPadding: false, // Disables extra space reserved for the scrollbar
          icon: "error",
          html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al actualizar el servicio.
              Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
            </p>
            
          `,
          footer: `
                   <details class="text-sm cursor-pointer text-gray-500">
                     <summary>Detalles del error</summary>
                     <p>Código de error: ${error}</p>
                   </details>
                 `,
          confirmButtonColor: "#33B8AD",
        });
      }
    },
  });

  return (
    <main className="mt-20 md:mt-28 ">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Nuevo servicio
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="flex py-10 w-4/5 lg:w-1/3 mx-auto flex-col items-center gap-4"
      >
        <FormInput
          type="text"
          id="name"
          placeholder="Nombre del servicio"
          label="Nombre"
          fieldProps={formik.getFieldProps("name")}
          errorMessage={formik.errors.name}
          showError={formik.touched.name && formik.errors.name}
        />
        <TextareaInput
          type="text"
          id="description"
          placeholder="Descripción del servicio"
          label="Descripción"
          fieldProps={formik.getFieldProps("description")}
          errorMessage={formik.errors.description}
          maxLength={100}
          showError={formik.touched.description && formik.errors.description}
        />
        <SelectInput
          id="category"
          label="Categoría"
          placeholder="Selecciona una categoría"
          options={categories}
          selectedOption={formik.values.category}
          setTouched={formik.setFieldTouched}
          setSelectedOption={formik.setFieldValue}
          errorMessage={formik.errors.category}
          showError={formik.touched.category && formik.errors.category}
        />
        <FormInput
          type="number"
          id="price"
          placeholder="Precio del servicio"
          label="Precio"
          fieldProps={formik.getFieldProps("price")}
          errorMessage={formik.errors.price}
          maxLength={100}
          showError={formik.touched.price && formik.errors.price}
        />
        <TagSelector
          features={features}
          id="features"
          selectedFeatures={formik.values.features}
          setSelectedFeatures={formik.setFieldValue}
        />
        <ImageInput
          image={formik.values.image}
          label="Imagen"
          setImage={formik.setFieldValue}
          setTouched={formik.setFieldTouched}
          errorMessage={formik.errors.image}
          showError={formik.touched.image && formik.errors.image}
          formik={formik}
        />
        <button
          className="px-10 mt-8 disabled:bg-tertiary disabled:text-primary hover:bg-teal-600 w-fit mx-auto rounded-lg py-2 bg-primary text-white"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Guardando cambios..." : "Actualizar servicio"}
        </button>
      </form>
    </main>
  );
}

ServiceDetail.loader = loader;
