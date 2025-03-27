import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PaintingService } from "../services/paintings.service"
import Painting from "../models/Painting"
import { StarRating } from "../components/StarRating"

function PaintingDetail() {
  const {id} = useParams()
  const [painting, setPainting] = useState<Painting>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    setLoading(true)
    PaintingService
      .getById(Number(id))
      .then(setPainting)
      .catch(error => setError(error.message))
      .finally(()=>setLoading(false))
  },[id])

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error}</div>
  if(!painting) return <div>Pintura no encontrada</div>

  return (
    <div className="text-black dark:text-black p-6 bg-[#FFFAEC] w-full">
      <div className="text-5xl font-extrabold mb-4 text-center">{painting.title}</div>
      <div className="text-3xl font-semibold mb-6 text-center text-black">{painting.description}</div>
      <div className="flex justify-center mb-6">
        <StarRating idPainting={Number(id)} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-lg">
          <span className="font-semibold text-black">Activo:</span>
          <span className={painting.active ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
            {painting.active ? 'SI' : 'NO'}
          </span>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <span className="font-semibold text-black">Email de contacto:</span>
          <span className="text-black">{painting.contactEmail}</span>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <span className="font-semibold text-black">Fecha publicación:</span>
          <span className="text-black">{new Date(painting.published).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <span className="font-semibold text-black">Fecha finalización:</span>
          <span className="text-black">{new Date(painting.expired).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
  
  
}

export default PaintingDetail