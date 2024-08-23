import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  if (error) {
    console.log(error);

    // the response json is automatically parsed to
    // `error.data`, you also have access to the status
    return (
      <main className="mt-20 md:mt-28">
        <h1>Error</h1>
        {/* <h2>{error.data.sorry}</h2> */}
        {/* <p>
          Go ahead and email {error.data.hrEmail} if you feel like this is a
          mistake.
        </p> */}
      </main>
    );
  }
};

export default ErrorBoundary;
