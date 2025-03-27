import { useEffect, useState } from "react";
import { UserService } from "../services/userService";
import User from "../models/User";



function Profile() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    UserService.getProfile()
      .then(setUser)
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Error desconocido");
      })
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <div className="w-full bg-[#FFFAEC] dark:bg-[#FFFAEC] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-100 shadow-lg rounded-2xl p-6">
        <h2 className="font-serif text-3xl font-extrabold text-[#E17564] dark:text-[#E17564] text-center mb-4">
          Perfil de Usuario
        </h2>
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        {loading ? (
          <p className="text-gray-600 text-center">Cargando...</p>
        ) : (
          user && (
            <div className="space-y-5">
              <div className="border-b pb-2">
                <p className="text-sm font-medium text-gray-500">Nombre</p>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium text-gray-500">Rol</p>
                <p className="text-lg font-semibold text-gray-900">{user.role}</p>
              </div>
              <div className="border-b pb-2">
                <p className="text-sm font-medium text-gray-500">Activado</p>
                <p
                  className={`text-lg font-semibold ${
                    user.active ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.active ? "Sí" : "No"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Recibe notificaciones por email
                </p>
                <p
                  className={`text-lg font-semibold ${
                    user.acceptNotifications ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.acceptNotifications ? "Sí" : "No"}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}


export default Profile