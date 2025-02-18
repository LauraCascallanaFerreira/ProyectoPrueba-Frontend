import { Link } from 'react-router-dom'


function Navbar() {
  return (
    

<nav className="bg-[#FFFAEC] border-gray-200 dark:bg-[#FFFAEC]">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-[#3D3D3D]">GALLERY</span>
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 
focus:ring-4 focus:outline-none focus:ring-blue-300 
font-medium rounded-lg text-sm px-4 py-2 text-center 
dark:bg-[#578E7E] dark:hover:bg-[#3D3D3D] dark:focus:ring-[#3D3D3D] 
shadow-lg hover:shadow-xl active:scale-95 transition-transform 
dark:shadow-md dark:hover:shadow-lg">Get started</button>
      <button data-collapse-toggle="navbar" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-ky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#FFFAEC] md:dark:bg-[#FFFAEC] dark:border-[#FFFAEC]">
      <li>
        <Link to="/" className="font-serif block py-2 px-3 text-[#3D3D3D] bg-blue-700 rounded-sm md:bg-transparent  md:p-0 md:dark:text-[#3D3D3D]" aria-current="page">HOME</Link>
      </li>
      <li>
        <Link to="/login" className="font-serif block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-[#787878] dark:text-[#3D3D3D] dark:hover:bg-[#787878] dark:hover:text-[#787878] md:dark:hover:bg-transparent dark:border-gray-700">LOGIN</Link>
      </li>
      <li>
        <Link to="/register" className="font-serif block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-[#787878] dark:text-[#3D3D3D] dark:hover:bg-gray-700 dark:hover:text-[#787878] md:dark:hover:bg-transparent dark:border-gray-700">REGRISTO</Link>
      </li>
      <li>
        <Link to="/profile" className="font-serif block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-[#787878] dark:text-[#3D3D3D] dark:hover:bg-gray-700 dark:hover:text-[#787878] md:dark:hover:bg-transparent dark:border-gray-700">PROFILE</Link>
      </li>
      <li>
        <Link to="/userList" className="font-serif block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-[#787878] dark:text-[#3D3D3D] dark:hover:bg-gray-700 dark:hover:text-[#787878] md:dark:hover:bg-transparent dark:border-gray-700">USUARIOS</Link>
      </li>
      <li>
        <Link to="/paintings" className="font-serif block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-[#787878] dark:text-[#3D3D3D] dark:hover:bg-gray-700 dark:hover:text-[#787878] md:dark:hover:bg-transparent dark:border-gray-700">CUADROS</Link>
      </li>
      <li>
        <Link to="/categories" className="font-serif block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:dark:hover:text-[#787878] dark:text-[#3D3D3D] dark:hover:bg-gray-700 dark:hover:text-[#787878] md:dark:hover:bg-transparent dark:border-gray-700">CATEGORIAS</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>

  )
}

export default Navbar