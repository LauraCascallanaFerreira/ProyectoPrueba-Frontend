import { ChangeEvent, useEffect, useState } from "react";
import Painting from "../models/Painting";
import { PaintingService } from "../services/paintings.service";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function PaintingList() {
  const [paintings, setPaintings] = useState<Painting[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [queryParams, setQueryParams] = useSearchParams();
  const titleQuery = queryParams.get("title") || "";

  useEffect(() => {
    PaintingService.search(titleQuery)
      .then(setPaintings)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [titleQuery]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setQueryParams(newTitle ? { title: newTitle } : {});
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro que quieres borrar este cuadro?"))
      return;

    try {
      await PaintingService.delete(id);
      setPaintings(paintings?.filter((painting) => painting.id !== id));
      toast.success("Cuadro borrado correctamente!");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido");
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-[#FFFAEC] w-full px-6 py-12 shadow-xl ">
      <h2 className="text-5xl font-serif font-extrabold text-[#E17564] text-center mb-8">
        LISTA DE CUADROS
      </h2>
      <div className="flex justify-center mb-8">
        <Link
          to="/paintings/new"
          className="text-white bg-[#467A69] hover:bg-[#3A6A5A] transition-all duration-300 font-semibold rounded-lg text-lg px-8 py-4 shadow-lg transform hover:scale-105"
        >
          + Añadir nuevo cuadro
        </Link>
      </div>
  
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
        Buscar
      </label>
      <div className="relative w-full max-w-lg mx-auto mb-8">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          className="w-full p-4 pl-12 text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-[#467A69] focus:border-[#467A69] shadow-sm"
          value={titleQuery}
          onChange={handleSearchChange}
          placeholder="Buscar por título"
        />
  
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#467A69] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#3A6A5A] transition-all duration-300 transform hover:scale-105"
        >
          Buscar
        </button>
      </div>
  
      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {paintings?.length === 0 && <p className="text-center text-gray-500">No hay cuadros disponibles</p>}
  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {paintings?.map((painting) => (
          <div
            key={painting.id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h5 className="mb-4 text-2xl font-semibold text-gray-900">{painting.title}</h5>
              <p className="text-gray-700 mb-6">{painting.description}</p>
            </div>
  
            <div className="flex justify-between gap-2 mt-4">
              <Link
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                to={`/paintings/${painting.id}`}
              >
                Ver
              </Link>
              <Link
                className="px-4 py-2 text-xs font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
                to={`/paintings/edit/${painting.id}`}
              >
                Editar
              </Link>
              <button
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                onClick={() => handleDelete(painting.id)}
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
}

export default PaintingList;