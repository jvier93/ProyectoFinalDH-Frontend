import { useAuth } from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="mt-20 md:mt-28">
      <h1 className="text-center text-xl text-primary  lg:text-4xl">
        Mi perfil
      </h1>
      <section className="md:px-20 px-2 py-10 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Información personal</h2>
          <div>
            <p className="text-xl">
              {<FontAwesomeIcon className="text-primary" icon={faUser} />}{" "}
              {user?.username}
            </p>
            <p className="text-sm">
              {
                <FontAwesomeIcon
                  size="lg"
                  className="text-primary"
                  icon={faEnvelope}
                />
              }{" "}
              {user?.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Información adicional</h2>
          <div>
            <p>Rol: {user.roles[0].name}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
