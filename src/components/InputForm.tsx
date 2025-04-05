import React from 'react'
interface InputFormProps {
    text: string
    name: string
    value?: string
    checked?: boolean
    placeholder?: string
    type?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: string | undefined
    }
function InputForm({text, name, value,checked, handleChange, error, placeholder='', type='input'}: InputFormProps) {
  return (
    <div className="mb-4 space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#400D0D]"
      >
        {text}
      </label>
      <input
        value={value}
          checked={checked}
        onChange={handleChange}
          type={type}
        name={name}
        id={name}
        className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#400D0D] focus:border-[#400D0D] shadow-sm hover:bg-gray-100 transition-all duration-200"
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
  
}

export default InputForm