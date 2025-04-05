import { FormEvent, useEffect, useState } from "react"
import { CategoryService } from "../services/category.service"
import Category from "../models/Category"

interface CategoryFormProps{
    onSubmit: (e:FormEvent, name: string) => void
}
function CategoryForm({onSubmit}:CategoryFormProps) {
    const [name, setName] = useState('')
    return (
        <form onSubmit={(e) => onSubmit(e, name)} className="bg-[gray-100] dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto flex flex-col gap-4">
            <label htmlFor="name" className="text-lg font-semibold text-[#400D0D] dark:text-[#400D0D]">
                Nombre:
            </label>
            <input 
                id="name" 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#400D0D] dark:bg-[#400D0D] dark:border-[#400D0D] dark:text-[#400D0D]"
            />
            <button className="bg-[#400D0D] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#A66953] transition duration-300">
                Guardar
            </button>
        </form>
    );
}

interface CategoryListProps{
    categories: Category[]
    onDelete: (id: number) => void
}
function CategoryList({categories, onDelete}: CategoryListProps) {
    return (
        <div className="text-white bg-[#F2C3A7] p-6 rounded-lg shadow-lg">
            {categories.map(category => (
        <div key={category.id} className="flex justify-between items-center py-2 border-b border-white last:border-b-0">
            <span className="text-black font-semibold text-lg">{category.name}</span>
            <button 
                onClick={() => onDelete(category.id)} 
                className="bg-[#400D0D] text-white py-1 px-3 rounded hover:bg-[#A66953] focus:outline-none focus:ring-2 focus:ring-[#A66953]"
            >
                Borrar
            </button>
        </div>
    ))}
</div>
    )
}


function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(()=>{ // cargar las categorias de la BD
        CategoryService
            .getAll()
            .then(setCategories)
    }, [])

    const handleCreate = async (e: FormEvent, name: string) => { // guardar una categoria
        e.preventDefault()
        const nuevaCategory = await CategoryService.create({name})
        setCategories([...categories, nuevaCategory])
    }
    
    const handleDelete = (id: number) => { // borrar una categoria
        if (!window.confirm("¿Estás seguro que quieres borrar esta categoría?"))
            return;
        CategoryService.delete(id)
        setCategories(categories?.filter((category) => category.id !== id));
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6 w-full" style={{ backgroundImage: "url('/src/img/fondo.png')" }}>
            <div className="max-w-4xl w-full p-10 bg-[#A66953] dark:white rounded-2xl shadow-2xl">
                <h1 className="text-5xl font-extrabold text-[#400D0D] dark:text-[#400D0D] text-center mb-8">
                    Gestión de categorías
                </h1>
                <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                    <CategoryForm onSubmit={handleCreate} />
                </div>
                <div className="mt-10">
                    <CategoryList categories={categories} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
}

export default CategoryManager