import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";
import Suggestion from "../models/Suggestion";
import { useNavigate, useParams } from "react-router-dom";
import { SuggestionService } from "../services/suggestion.service";
import toast from "react-hot-toast";
import ErrorMsgData from "../utils/ErrorMsgData";
import InputForm from "../components/InputForm";
import TextAreaInputForm from "../components/TextAreaInputForm";


function SuggestionForm(){
    const now = Temporal.Now.plainDateISO()
    const threeMonthLater = now.add({months: 3}).toString().slice(0,16)

    const [form, setForm] = useState<Partial<Suggestion>>({
        message: '',
        published: new Date().toISOString().slice(0,16), //2007-11-03T16:18:05Z ->  2007-11-03T16:18
        expired: threeMonthLater,
        idPainting: undefined
    })

    const {id} = useParams()
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(id){
          
          setLoading(true)
          SuggestionService.getById(Number(id))
          .then(data => setForm({
            ...data,
            published: new Date(data.published || '').toISOString().slice(0,16),
            expired: new Date(data.expired || '').toISOString().slice(0,16)
          }))
          .catch((error) => setErrors(error.message))
          .finally(()=>setLoading(false))
    
        }
      }, [id])

      const handleSubmit = async (e: FormEvent) =>{
        try{
          setLoading(true)
          setErrors({});
          e.preventDefault()
          const formData = {
            ...form,
            published: new Date(form.published || '').toISOString(),
            expired: new Date(form.expired || '').toISOString()
          }
          console.log(formData)
          if(id) await SuggestionService.update(Number(id), formData)
            else await SuggestionService.create(formData)
          toast.success('Mensaje guardado correctamente.')
          navigate('/suggestions')
        }catch(error){
          toast.error('Error al guardar el mensaje!')
           if(Array.isArray(error)){
                  const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
                    const errorDetail = err as ErrorMsgData;
                    acc[errorDetail.path] = errorDetail.msg;
                    return acc;
                  }, {});
                  setErrors(errorObj);
                }else if(error instanceof Error){
                  const msg = error instanceof Error ? error.message : "Error desconocido"
                  setErrors({message: msg || 'Error desconocido'});
                }else{
                  setErrors({message: error as string || 'Error desconocido'});
                }
        }finally{
          setLoading(false)
        }
      }

    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const {value, name} = e.target
        setForm({ ...form, [name]:value,  }) 
    }

    if(loading) return <p>Loading...</p>

    return (
        <div className="text-white flex flex-col items-center p-6 bg-[#FFFAEC] w-full min-h-screen">
          <h2 className="font-serif text-4xl font-extrabold text-center mb-6 text-[#3D3D3D]">
            {id ? "EDICIÓN DE UN CUADRO" : "INSERCIÓN DE UN NUEVO CUADRO"}
          </h2>
      
          <form
            className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4"
            onSubmit={handleSubmit}
          >
            
            <TextAreaInputForm
              type="textarea"
              rows={10}
              text="Mensaje"
              name="mensaje"
              value={form.message || ""}
              handleChange={handleChange}
              error={errors.message}
            />
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputForm
                type="datetime-local"
                text="Fecha publicación:"
                name="published"
                value={form.published || ""}
                handleChange={handleChange}
                error={errors.published}
              />
              <InputForm
                type="datetime-local"
                text="Fecha Finalización:"
                name="expired"
                value={form.expired || ""}
                handleChange={handleChange}
                error={errors.expired}
              />
            </div>
      
            {errors?.message && (
              <p className="text-center mt-4 text-red-500">{errors.message}</p>
            )}
      
            <button
              type="submit"
              className="font-serif w-full bg-[#578E7E] hover:bg-[#3D3D3D] text-white font-bold py-2.5 rounded-lg transition-all"
            >
              Guardar
            </button>
          </form>
        </div>
        );
}






export default SuggestionForm