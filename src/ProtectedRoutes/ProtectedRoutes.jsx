import { useUserContext } from "../providers/UserContext"
import { Navigate, Outlet } from "react-router-dom"
export const ProtectedRoutes = () =>{
    const { user } = useUserContext()

    return user ? <Outlet /> : <Navigate to="/" />
}