import React, { useContext } from "react"
import { Navigate, Outlet} from 'react-router-dom';
import { AppContext } from "../context/AppContextProvider";



const PrivateRoute = () => {
    const context = useContext(AppContext)

    return context.logged ? <Outlet /> : <Navigate to='/_admin'/>
} 

export default PrivateRoute