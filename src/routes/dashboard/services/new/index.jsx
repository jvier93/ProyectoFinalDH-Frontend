import { useFormik } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import FormInput from "@/components/FormInput";
import TagSelector from "@/components/TagSelector";
import TextareaInput from "@/components/Textareainput";
import ImageInput from "@/components/ImageInput";
import SelectInput from "../../../../components/SelectInput";

const API_URL = import.meta.env.VITE_API_URL;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const loader = async () => {
  try {
    const featuresResponse = await fetch(`${API_URL}/characteristics`);
    const categoriesResponse = await fetch(`${API_URL}/categories`);

    if (!featuresResponse.ok || !categoriesResponse.ok) {
      throw new Error("Error al traer los datos");
    }

    const categories = await categoriesResponse.json();

    const features = await featuresResponse.json();

    return {
      features,
      categories,
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

export default function NewService() {
  const { features, categories } = useLoaderData();

  const navigate = useNavigate();

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
      .object({
        name: yup
          .string()
          .oneOf(
            categories?.map((category) => category.name),
            "Categoría inválida"
          )
          .required("El nombre de la categoría es requerido"),
      })
      .required("La categoría es requerida"),

    image: yup
      .mixed()
      .required("La imagen del servicio es requerida")
      .test(
        "fileType",
        "Solo se permiten imágenes JPG, JPEG o PNG",
        (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      features: [],
      category: "",
      price: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "ProyectoIntegrador-preset");
        formData.append("cloud_name", "dixptvyr3"); // Preset de Cloudinary

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        return data.secure_url; // URL de la imagen subida
      };
      try {
        const imageUrl = await uploadImageToCloudinary(values.image);
        const payload = {
          name: values.name,
          description: values.description,
          price: values.price,
          categoryId: values.category.id,
          urlImage: imageUrl,
          characteristics: values.features,
        };

        const response = await fetch(`${API_URL}/products/new`, {
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
              Hubo un problema al crear el servicio.
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
          {formik.isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </main>
  );
}

NewService.loader = loader;
