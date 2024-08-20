import { useLocation } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <main className="mt-20 md:mt-28">
      <p>
        Te hemos enviado un codigo de activacion a {email} por favor envialo
        para completar la activacion{" "}
      </p>
    </main>
  );
};

export default Verify;
