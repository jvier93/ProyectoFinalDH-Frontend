import Button from "@/components/Button";

const Dashboard = () => {
  return (
    <main className="mx-auto mt-20 max-w-[1366px] text-textPrimary md:mt-28">
      <h1 className="text-center text-xl lg:text-4xl">
        Panel de administración
      </h1>
      <section className="space-y-5 py-8">
        <div className="flex gap-2">
          <Button to="/dashboard/users" variant="primary" size="medium">
            Administrar usuarios
          </Button>
          <Button to="/dashboard/services" variant="primary" size="medium">
            Administrar servicios
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
