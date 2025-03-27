import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Home() {

  const {isAuthenticated} = useAuth()

  return (
    <div className="bg-[#FFFAEC] w-full min-h-screen"
    >
      {/* Hero Section */}
      <header className="text-center py-20 px-6 shadow-md bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/src/img/impresion.jpg')" }}>
        <h1 className="text-[#E17564] text-6xl font-bold font-serif leading-tight">
          BIENVENIDO A GALERÍAS LAURA
        </h1>
        <p className="mt-4 text-xl text-white max-w-2xl mx-auto shadow-white">
          Regístrate, explora y lleva el arte a casa.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="mt-12 inline-block bg-[#be3144b3] text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:bg-[#df4358ab] transition duration-300"
          >
            ¡Regístrate Ahora!
          </Link>
        )}
        
      </header>
  
      {/* Beneficios de la plataforma */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
          {/* Beneficio 1 */}
          <div className="bg-[#E17564] p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-white">🔍 Encuentra Obras Únicas</h3>
            <p className="text-white mt-3 text-lg">
              Accede a cuadros exclusivos y filtra según tus intereses.
            </p>
          </div>
  
          {/* Beneficio 2 */}
          <div className="bg-[#E17564] p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-white">📩 Recibe Notificaciones</h3>
            <p className="text-white mt-3 text-lg">
              Sé el primero en recibir nuevas obras y oportunidades exclusivas.
            </p>
          </div>
  
          {/* Beneficio 3 */}
          <div className="bg-[#E17564] p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-semibold text-white">🚀 Conéctate con Artistas</h3>
            <p className="text-white mt-3 text-lg">
              Descubre pintores talentosos y encuentra obras que se adapten a tu gusto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;