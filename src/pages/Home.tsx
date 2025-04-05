import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Home() {

  const {isAuthenticated} = useAuth()

  return (
    <div className="bg-[#F2C3A7] w-full min-h-screen"
    >
      {/* Hero Section */}
      <header className="text-center py-32 px-6 shadow-md bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/src/img/fondo.png')" }}>
        <h1 className="text-white text-6xl font-bold font-serif leading-tight">
          BIENVENIDO A GALERÍAS LAURA
        </h1>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-12 inline-block bg-[#400D0D] text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-[#df4358ab] transition duration-300"
          >
            ¡Regístrate Ahora!
          </Link>
        )}
        
      </header>
  
      {/* Beneficios de la plataforma */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
          {/* Beneficio 1 */}
          <div className="bg-[#A66953] p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-[#260A0A] font-serif">Encuentra Obras Únicas</h3>
            <p className="text-[#260A0A] mt-3 text-lg font-serif">
              Accede a cuadros exclusivos y filtra según tus intereses.
            </p>
          </div>
  
          {/* Beneficio 2 */}
          <div className="bg-[#A66953] p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-[#260A0A] font-serif">Recibe Notificaciones</h3>
            <p className="text-[#260A0A] mt-3 text-lg font-serif">
              Sé el primero en recibir nuevas obras y oportunidades exclusivas.
            </p>
          </div>
  
          {/* Beneficio 3 */}
          <div className="bg-[#A66953] p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-[#260A0A] font-serif">Conéctate con Artistas</h3>
            <p className="text-[#260A0A] mt-3 text-lg font-serif">
              Descubre pintores talentosos y encuentra obras que se adapten a tu gusto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;