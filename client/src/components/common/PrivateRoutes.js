
import { Outlet, Navigate } from "react-router";

const PrivateRoutes  = () => {
   let user = JSON.parse(localStorage.getItem('user'))
    
    return (
        user?.success === true ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes