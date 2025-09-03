
import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthenticateUser } from '../Utils/Api';



const UserAuthContext = createContext(null);

const fetchUser = async ({setUser}) => {
    try {
        const response = await AuthenticateUser()
        console.log(response)
        setUser(response.data)
      } catch (error) {
        console.error(error, "from fetchUser")
      }}
      
      const AuthContext = ({children}) => {
        
    const [userStatus, setUser] = useState({
      isAuthenticated: false,
      userId: null,
    })
    
    
    
    useEffect(() =>{
      fetchUser({setUser});
    },[])
    
    
    return (
    <UserAuthContext.Provider value={{userStatus,setUser}}>
      {children}
    </UserAuthContext.Provider>
  )
}

export default AuthContext

export const useUserAuthStatus = () => useContext(UserAuthContext)
