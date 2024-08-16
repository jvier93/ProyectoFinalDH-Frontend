import { useSubmit, redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import FormInput from "@/components/FormInput";

async function action({ request }) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData);
  console.log(values);

  throw new Error("Error al crear la cuenta");
}

export default function Signup() {
  const submit = useSubmit();

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(15, "El nombre no puede tener más de 15 caracteres")
      .required("Nombre es requerido"),
    surname: yup
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .max(15, "El apellido no puede tener más de 15 caracteres")
      .required("Apellido es requerido"),
    email: yup.string().email("Email inválido").required("Email es requerido"),
    password: yup
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .matches(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .matches(/\d/, "La contraseña debe contener al menos un número")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "La contraseña debe contener al menos un carácter especial"
      )
      .required("Contraseña es requerida"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
      .required("Repetir contraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      submit(values, { method: "post" });
    },
  });

  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Crear cuenta
      </h1>
      <form
        className="flex py-10 w-4/5 lg:w-1/3 mx-auto flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <FormInput
          type="text"
          id="name"
          label="Nombre"
          fieldProps={formik.getFieldProps("name")}
          errorMessage={formik.errors.name}
          showError={formik.touched.name && formik.errors.name}
        />
        <FormInput
          type="text"
          id="surname"
          fieldProps={formik.getFieldProps("surname")}
          label="Apellido"
          errorMessage={formik.errors.surname}
          showError={formik.touched.surname && formik.errors.surname}
        />
        <FormInput
          type="email"
          id="email"
          fieldProps={formik.getFieldProps("email")}
          label="Email"
          errorMessage={formik.errors.email}
          showError={formik.touched.email && formik.errors.email}
        />
        <FormInput
          type="password"
          id="password"
          fieldProps={formik.getFieldProps("password")}
          label="Contraseña"
          errorMessage={formik.errors.password}
          showError={formik.touched.password && formik.errors.password}
        />
        <FormInput
          type="password"
          id="repeatPassword"
          fieldProps={formik.getFieldProps("repeatPassword")}
          label="Repetir contraseña"
          errorMessage={formik.errors.repeatPassword}
          showError={
            formik.touched.repeatPassword && formik.errors.repeatPassword
          }
        />
        <button
          className="px-10 mt-8 hover:bg-teal-600 w-fit mx-auto rounded-lg py-2 bg-primary text-white"
          type="submit"
        >
          Registrarme
        </button>
      </form>
    </main>
  );
}

Signup.action = action;
