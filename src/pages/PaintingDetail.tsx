import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PaintingService } from "../services/paintings.service"
import Painting from "../models/Painting"

function PaintingDetail() {
  const {id} = useParams()
  const [painting, setPainting] = useState<Painting>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    setLoading(true)
    //if(!id) return
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
    <div className="text-white">
      <div>Titulo: {painting.title}</div>
      <div>Descripcion: {painting.description}</div>
      <div>Activo: {painting.active?'SI':'NO'}</div>
      <div>Email de contacto: {painting.contactEmail}</div>
      <div>Fecha publicación: {new Date(painting.published).toLocaleString()}</div>
      <div>Fecha finalización: {new Date(painting.expired).toLocaleString()}</div>
      
    </div>
  )
}

export default PaintingDetail