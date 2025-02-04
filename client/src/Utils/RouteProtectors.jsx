import React, { useEffect, useState } from "react";
import { AuthenticateUser } from "./Api";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedUserRoutes = () => {
    const [isAuthorized, setAuthorized] = useState(false);
    const [isLoading, setLoading] = useState(false);

useEffect( () =>{

   const checkAuth =  async () =>{
    try {
        setLoading(true); 
        const response = await AuthenticateUser();
        console.log("yeah wre checking")
      
        if (response.status === 200 && response.data === true) {
          setAuthorized(true); 
        } else {
          setAuthorized(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthorized(false); 
      } finally {
        setLoading(false);
      }
    };

    checkAuth()
}
    ,[])

    

    if(isLoading){
        return <div>Loading.... </div>
    }

    return isAuthorized ? <Outlet/> : <Navigate to="/Login"/>}

export {
    ProtectedUserRoutes
}