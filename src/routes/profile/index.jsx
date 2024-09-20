import { useAuth } from "@/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useAuth();

  return (
    <main className="mt-20 text-textPrimary md:mt-28">
      <h1 className="text-center text-xl lg:text-4xl">Mi perfil</h1>
      <section className="mx-auto flex max-w-[1366px] flex-col gap-4 px-2 py-10">
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
            <p>Rol: {user.roles[0]}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
