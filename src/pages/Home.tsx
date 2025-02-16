function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white bg-[#F5ECD5] px-6">
      <h1 className="text-5xl font-bold mb-4 text-[#3D3D3D] text-center">
        Bienvenido a Galerías Laura
      </h1>
      <p className="text-lg mb-6 text-[#3D3D3D] text-center leading-relaxed">
        Explora nuestras secciones y descubre más.
      </p>
      <div className="flex space-x-6">
        <button className="px-8 py-3 bg-[#578E7E] font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-[#3D3D3D] transition-all duration-300" style={{ color: "#FFFAEC" }}>
          Empezar
        </button>
        <button className="px-8 py-3 bg-[#578E7E] font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-[#3D3D3D] transition-all duration-300" style={{ color: "#FFFAEC" }}>
          Empezar
        </button>
      </div>
    </div>
  );
}

export default Home;