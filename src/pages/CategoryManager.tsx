import { FormEvent, useEffect, useState } from "react"
import { CategoryService } from "../services/category.service"
import Category from "../models/Category"

interface CategoryFormProps{
    onSubmit: (e:FormEvent, name: string) => void
}
function CategoryForm({onSubmit}:CategoryFormProps) {
    const [name, setName] = useState('')
    return (
        <form onSubmit={(e) => onSubmit(e, name)} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md mx-auto flex flex-col gap-4">
            <label htmlFor="name" className="text-lg font-semibold text-gray-800 dark:text-white">
                Nombre:
            </label>
            <input 
                id="name" 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#578E7E] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button className="bg-[#578E7E] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#3D3D3D] transition duration-300">
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
        <div className="text-white">
        {categories.map(category =>  
            <div key={category.id}>
                {category.name} -
                <button onClick={()=>onDelete(category.id)}>Borrar</button>
            </div>
        )}
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
        <div className="bg-[#FFFAEC] min-h-screen flex items-center justify-center p-6 w-full">
            <div className="max-w-4xl w-full p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
                <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white text-center mb-8">
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