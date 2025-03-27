export default interface Painting{
    id: number
    author: string
    title: string
    description?: string
    active: boolean
    contactEmail?:string
    published: string
    expired:string
    idCategory?: number | null
  }