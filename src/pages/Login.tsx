import { ChangeEvent, FormEvent, useState } from 'react'
import { AuthService } from '../services/auth.service'

function Login() {

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  )
  const [message, setMessage ] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try{
     const response= await AuthService.loginUser(form.email, form.password)
     console.log(response);
     
      console.log('login successfull')
      setMessage('login successfull')
      console.log(form.email)

    }catch(error){
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return (
    <div className="flex justify-center items-center min-h-screen w-full p-4" style={{ backgroundImage: "url('/src/img/fondo.png')" }}>
      <form className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-serif font-semibold text-[#400D0D] text-center mb-6">LOGIN</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-[#400D0D]">Email</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            id="email" 
            className="mt-1 block w-full p-3 border border-[gray-300] rounded-lg shadow-sm focus:ring-[#400D0D] focus:border-[#400D0D]" 
            placeholder="name@example.com" 
            required 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-[#400D0D]">Password</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            id="password" 
            className="mt-1 block w-full p-3 border border-[gray-300] rounded-lg shadow-sm focus:ring-[#400D0D] focus:border-[#400D0D]" 
            required 
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input 
              id="remember" 
              type="checkbox" 
              className="w-4 h-4 text-[#578E7E] border-[gray-300] rounded focus:rin g-[#578E7E]" 
            />
            <label htmlFor="remember" className="ml-2 text-sm text-[#400D0D]">Remember me</label>
          </div>
        </div>
        <button 
          type="submit" 
          className="w-full bg-[#400D0D] hover:bg-[#A66953] text-white font-medium py-3 rounded-lg shadow-md transition-all">
          Submit
        </button>
        {message}
      </form>
    </div>
  )
  
}

export default Login