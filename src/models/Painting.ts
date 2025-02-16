export default interface Painting{
    id: number
    title: string
    description?: string
    active: boolean
    contactEmail?:string
    published: string
    expired:string
    idCategory?: number | null
  }