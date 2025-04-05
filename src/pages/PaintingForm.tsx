import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Painting from '../models/Painting'
import { PaintingService } from '../services/paintings.service'
import { useNavigate, useParams } from 'react-router-dom'
import { Temporal } from 'temporal-polyfill'
import toast from 'react-hot-toast'
import { CategoryService } from '../services/category.service'
import Category from '../models/Category'
import InputForm from '../components/InputForm'
import ErrorMsgData from '../utils/ErrorMsgData'
import TextAreaInputForm from '../components/TextAreaInputForm'

function PaintingForm() {
  const now = Temporal.Now.plainDateTimeISO()
  const threeMonthLater = now.add({months: 3}).toString().slice(0,16)

  const [form, setForm] = useState<Partial<Painting>>({
    title: '',
    author: '',
    description: '',
    active: true,
    contactEmail: '',
    published: new Date().toISOString().slice(0,16), //2007-11-03T16:18:05Z ->  2007-11-03T16:18
    expired: threeMonthLater,
    idCategory: undefined
  })
  const [categorias, setCategorias] = useState<Category[]>()

  const {id} = useParams()
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(id){
      
      setLoading(true)
      PaintingService.getById(Number(id))
      .then(data => setForm({
        ...data,
        published: new Date(data.published || '').toISOString().slice(0,16),
        expired: new Date(data.expired || '').toISOString().slice(0,16)
      }))
      .catch((error) => setErrors(error.message))
      .finally(()=>setLoading(false))

    }
  }, [id])

  useEffect(()=>{
    CategoryService.getAll()
      .then(setCategorias)
      .catch(error => setErrors(error.message))
  },[])

  const handleSubmit=async (e: FormEvent) =>{
    try{
      setLoading(true)
      setErrors({});
      e.preventDefault()
      const formData = {
        ...form,
        idCategory: form.idCategory ? Number(form.idCategory) : null,
        published: new Date(form.published || '').toISOString(),
        expired: new Date(form.expired || '').toISOString()
      }
      console.log(formData)
      if(id) await PaintingService.update(Number(id), formData)
        else await PaintingService.create(formData)
      toast.success('Cuadro guardado correctamente!')
      navigate('/paintings')
    }catch(error){
      toast.error('Error al guardar el cuadro!')
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

  const handleChangeCheckbox = (e:ChangeEvent<HTMLInputElement>) =>{
    const {checked, name} = e.target
    setForm({ ...form, [name]:checked,  }) 
  }

  if(loading) return <p>Loading...</p>

  return (
  <div className="text-white flex flex-col items-center p-6 w-full min-h-screen"style={{ backgroundImage: "url('/src/img/fondo.png')" }}>
    <h2 className="font-serif text-4xl font-extrabold text-center mb-6 text-[#400D0D]">
      {id ? "EDICIÓN DE UN CUADRO" : "INSERCIÓN DE UN NUEVO CUADRO"}
    </h2>

    <form
      className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4 "
      onSubmit={handleSubmit}
    >
      <InputForm
        text="Título"
        name="title"
        value={form.title || ""}
        handleChange={handleChange}
        error={errors.title}
      />
      <InputForm
        text="Autor"
        name="author"
        value={form.author || ""}
        handleChange={handleChange}
        error={errors.author}
      />
      <TextAreaInputForm
        type="textarea"
        rows={6}
        text="Descripción"
        name="description"
        value={form.description || ""}
        handleChange={handleChange}
        error={errors.description}
      />

      <InputForm
        text="Email de contacto"
        name="contactEmail"
        value={form.contactEmail || ""}
        handleChange={handleChange}
        error={errors.contactEmail}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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

      <InputForm
        type="checkbox"
        text="Activa"
        name="active"
        checked={form.active}
        handleChange={handleChangeCheckbox}
        error={errors.active}
      />

      <div>
        <label
          htmlFor="idCategory"
          className="block mb-2 text-sm font-medium text-black"
        >
          Categoría:
        </label>
        <select
          id="idCategory"
          name="idCategory"
          value={form.idCategory ?? ""}
          onChange={handleChange}
          className="bg-white border border-gray-600 text-black text-sm rounded-lg focus:ring-[#3D3D3D] focus:border-[#3D3D3D] block w-full p-2.5"
        >
          <option value="">Selecciona categoría</option>
          {categorias?.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      {errors?.message && (
        <p className="text-center mt-4 text-red-500">{errors.message}</p>
      )}

      <button
        type="submit"
        className="font-serif w-full bg-[#400D0D] hover:bg-[#A66953] text-white font-bold py-2.5 rounded-lg transition-all"
      >
        Guardar
      </button>
    </form>
  </div>
  );
}

export default PaintingForm