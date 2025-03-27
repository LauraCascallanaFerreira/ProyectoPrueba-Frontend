import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthService } from "../services/auth.service";
import User from "../models/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorMsgData from "../utils/ErrorMsgData";
import InputForm from "../components/InputForm";

const Register: React.FC = () => {
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    email: "",
    password: "",
    acceptNotifications: true,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true);
      setErrors({});

      e.preventDefault();

      await AuthService.registerUser(form);

      toast.success("Usuario registrado con éxito!");
      navigate("/paintings");
    } catch (error) {
      toast.error("Error al registrar el usuario.");

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
      
    } finally {
      setLoading(false);
    }
  };

  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setForm({ ...form, [name]: checked });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#FFFAEC] px-4">
      <form className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="font-serif text-2xl font-semibold text-[#E17564] text-center mb-4">REGISTRO</h2>
        
        <InputForm text="Nombre" name="name" value={form.name || ''} handleChange={handleChange} error={errors.name} />
        <InputForm text="Email" name="email" value={form.email || ''} handleChange={handleChange} error={errors.email} />
        <InputForm text="Password" name="password" value={form.password || ''} handleChange={handleChange} error={errors.password} />
  
        <div className="flex items-center gap-2 mt-4">
          <input
            id="acceptNotifications"
            name="acceptNotifications"
            type="checkbox"
            value={form.acceptNotifications ? "on" : "off"}
            onChange={handleChangeCheckbox}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-[#3D3D3D]"
          />
          <label htmlFor="acceptNotifications" className="text-sm text-gray-700">
            Aceptas recibir notificaciones?
          </label>
        </div>
        {errors.acceptNotifications && (
          <p className="mt-1 text-sm text-red-500">{errors.acceptNotifications}</p>
        )}
  
        {errors?.message && <p className="text-center mt-4 text-red-500">{errors.message}</p>}
  
        <button
          type="submit"
          className="mt-4 w-full bg-[#be3144b3] hover:bg-[#df4358ab] text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-all duration-200 shadow-md"
        >
          Enviar
        </button>
      </form>
    </div>
  );
  
};

export default Register;
