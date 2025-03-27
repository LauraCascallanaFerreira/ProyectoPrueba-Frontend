export default interface User{
    id: number
    name: string
    email: string
    password: string
    active: boolean
    acceptNotifications: boolean
    role: string
}