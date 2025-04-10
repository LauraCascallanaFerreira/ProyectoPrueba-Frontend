import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <nav className="bg-[#D99C79] border-b border-[#D99C79] dark:bg-[#F5ECD5 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:p-6">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="src/img/espejo.png" className="w-14.5 h-18" alt="Galerias Laura Logo" />
          <span className="self-center text-3xl font-bold whitespace-nowrap text-[#400D0D]">GALERIAS LAURA</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button data-collapse-toggle="navbar" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:[#400D0D] dark:focus:ring-gray-600" aria-controls="navbar-ky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent">
            <li>
              <Link to="/" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] " aria-current="page">HOME</Link>
            </li>
            <li>
              <Link to="/login" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">LOGIN</Link>
            </li>
            <li>
              <Link to="/register" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">REGISTRO</Link>
            </li>
            <li>
              <Link to="/profile" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">PROFILE</Link>
            </li>
            <li>
              <Link to="/userList" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">USUARIOS</Link>
            </li>
            <li>
              <Link to="/paintings" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">CUADROS</Link>
            </li>
            <li>
              <Link to="/categories" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">CATEGORIAS</Link>
            </li>
            <li>
              <Link to="/suggestions" className="block py-2 px-3 text-[#400D0D] rounded-sm md:p-0 md:dark:text-[#400D0D] ">SUGERENCIAS</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  
}

export default Navbar