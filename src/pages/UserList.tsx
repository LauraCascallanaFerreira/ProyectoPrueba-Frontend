import { useEffect, useState } from 'react'
import { UserService } from '../services/userService'

interface User{
  id: number
  name: string
  role: string
  email: string
  active: boolean
  acceptNotifications: boolean
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function call(){
      try{
        const userList = await UserService.getAll()
        const activeUsers = userList.filter((user: User) => user.active);
        setUsers(activeUsers)      
      }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        setMessage(msg)
      }finally{
        setLoading(false)
      }
    }
    call()
  },[])

  if(loading)    return <div>Loading...</div>
  if (message) return <div>{message}</div>;
  

  return (
    <div className="min-h-screen bg-[#FFFAEC] flex flex-col items-center justify-start p-4 w-full">
      <h1 className="text-[#E17564] text-6xl font-bold font-serif leading-tight mb-6 text-center">
        LISTADO DE USUARIOS ACTIVOS
      </h1>
      <div className="relative overflow-x-auto shadow-lg rounded-lg">
        {message}
        <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-300">
          <thead className="text-xs text-white uppercase bg-[#be3144b3] dark:bg-[#be3144b3]">
            <tr>
              <th scope="col" className="px-6 py-4">Nombre</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-300 dark:border-gray-300 odd:bg-white even:bg-gray-100 dark:odd:bg-white dark:even:bg-white hover:bg-gray-200 dark:hover:bg-gray-200 transition-all"
              >
                <th scope="row" className="px-6 py-4 font-medium text-black dark:text-black">
                  {user.name}
                </th>
                <td className="px-6 py-4 text-black">{user.email}</td>
                <td className="px-6 py-4 text-black">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  
}

export default UserList