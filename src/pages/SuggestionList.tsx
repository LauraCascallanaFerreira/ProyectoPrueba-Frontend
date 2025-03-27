import {useState } from "react"
import Suggestion from "../models/Suggestion"
import { Link} from "react-router-dom";
import { SuggestionService } from "../services/suggestion.service";
import toast from "react-hot-toast";


function SuggestionList(){
    const [suggestions, setSuggestions] = useState<Suggestion[]>();
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar este cuadro?"))
          return;
    
        try {
          await SuggestionService.delete(id);
          setSuggestions(suggestions?.filter((suggestion) => suggestion.id !== id));
          toast.success("Cuadro borrado correctamente!");
        } catch (error) {
          setError(error instanceof Error ? error.message : "Error desconocido");
        }
      };
    
      return (
        <div className="flex flex-col gap-8 bg-[#FFFAEC] w-full px-6 py-12 shadow-xl ">
          <h2 className="text-5xl font-serif font-extrabold text-[#E17564] text-center mb-8">
            LISTA DE SUGERENCIAS
          </h2>
          <div className="flex justify-center mb-8">
            <Link
              to="/suggestions/new"
              className="text-white bg-[#467A69] hover:bg-[#3A6A5A] transition-all duration-300 font-semibold rounded-lg text-lg px-8 py-4 shadow-lg transform hover:scale-105"
            >
              + Añadir nueva sugerencia
            </Link>
          </div>
      
          {error && <p className="text-center text-red-600">{error}</p>}
          {suggestions?.length === 0 && <p className="text-center text-gray-500">No hay cuadros disponibles</p>}
      
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
            {suggestions?.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-gray-700 mb-6">{suggestion.message}</p>
                </div>
      
                <div className="flex justify-between gap-2 mt-4">
                  <Link
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    to={`/suggestions/${suggestion.id}`}
                  >
                    Ver
                  </Link>
                  <Link
                    className="px-4 py-2 text-xs font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
                    to={`/suggestions/edit/${suggestion.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="px-4 py-2 text-xs font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleDelete(suggestion.id)}
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


export default SuggestionList
