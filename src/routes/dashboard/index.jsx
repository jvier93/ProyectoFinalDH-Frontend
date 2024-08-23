import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Panel de administración
      </h1>
      <section className="space-y-5   md:px-10 px-2 py-8 sm:px-6">
        <div className="flex gap-2">
          <Link
            className="rounded-full py-2  bg-secondaryLight px-20 text-primaryLight"
            to="/dashboard/users"
          >
            Administrar usuarios
          </Link>
          <Link
            className="rounded-full py-2  bg-secondaryLight px-20 text-primaryLight"
            to="/dashboard/services"
          >
            Administrar servicios
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
