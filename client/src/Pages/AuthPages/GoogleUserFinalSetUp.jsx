import React, { useEffect, useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { GoogleFinalSetUpApi } from '../../Utils/Api';


const GoogleUserFinalSetUp = () => {
    const [userData, setUserData] = useState({})
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const userProvider = searchParams.get("userProvider")
    const email = searchParams.get("email")

    useEffect(() => {
        
        if(userProvider && email){
            console.log(userProvider, email)
            setUserData({userProvider, email})
        }
        console.log(userData)
            
    }, [userProvider, email])    

    
    useEffect(() => {
        
        if(userProvider && email){
            setUserData({userProvider, email})
        }
        console.log(userData)
            
    }, [userProvider, email])    

    useEffect(() => {
        if (userData.userProvider && userData.email) {
          console.log("Updated userData:", userData);
        }
      }, [userData]);

            const finalGoogleUserSetUp = async (e)  => {

                e.preventDefault();
                const formData = new FormData(e.target)
                const data = Object.fromEntries(formData.entries());
                console.log("formData ", data )
                data.id = userData.userProvider;
                console.log("formData ", data )
                try{
                 const response = await GoogleFinalSetUpApi(data)
                console.log(response)
                
                if(response.status === 201){
                        navigate("/Login")
                    }}
                catch(error){
                    console.log(error)
                }
                
            }


    return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Final Set UP  {userData.email? `for ${userData.email}` : "" }</h1>
        <form className="space-y-4" onSubmit={finalGoogleUserSetUp}>
        
    
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a strong password"
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.
            </p>
          </div>
    
          
          
          <div>
            <label htmlFor="bloggingStyle" className="block text-sm font-medium text-gray-700">Blogging Style</label>
            <select
              id="bloggingStyle"
              name="bloggingStyle"
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select one</option>
              <option value="writer">Writer</option>
              <option value="reader">Reader</option>
              <option value="both">Both</option>
            </select>
          </div>
    
          <button
            type="submit"
            className="w-full bg-blue-500 cursor-pointer text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>      
        </form>
      </div>
      )
    
  
}

export default GoogleUserFinalSetUp