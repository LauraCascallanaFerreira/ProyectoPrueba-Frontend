import Painting from "../models/Painting"
import { fetchAPI } from "../utils/FetchAPIS"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class PaintingService{

    static async search(title?: string) {
        let url = API_URL_BASE+'/paintings?'
        if(title) url += 'title='+title

        return await fetchAPI(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async getById(id:number) {
        return await fetchAPI(API_URL_BASE+'/paintings/'+id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }

    static async create(painting: Partial<Painting>) {
        return await fetchAPI(API_URL_BASE+'/paintings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(painting),
            credentials: 'include'
        })
    }

    static async update(id:number, painting: Partial<Painting>) {
        return await fetchAPI(API_URL_BASE+'/paintings/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(painting),
            credentials: 'include'
        })
    }

    static async delete(id: number){
        return await fetchAPI(API_URL_BASE+'/paintings/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
    }
}