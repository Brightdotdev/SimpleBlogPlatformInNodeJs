import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import LogIn from '../Pages/AuthPages/LogIn'
import SignUp from '../Pages/AuthPages/SignUp'
import GoogleUserFinalSetUp from '../Pages/AuthPages/GoogleUserFinalSetUp'
import SomethingWentWrong from '../Pages/AuthPages/SomethingWentWrong'
import FourOhFour from '../Pages/FourOhFOur'
import { AppLoader } from './AppLoader'





 export const router = createBrowserRouter([
    {
        path : "/",
        element : <HomePage/>,
        loader : AppLoader,    
        errorElement : <SomethingWentWrong/>
    },
    {
        path : "/v3/auth",
        errorElement : <SomethingWentWrong/>,
        children :  [
     
       {path : "JoinUs",
       element : <SignUp/>,
       errorElement : <SomethingWentWrong/>},
      
       {path : "WelcomeBack",
     element : <LogIn/>, 
    errorElement : <SomethingWentWrong/>
},
{path : "AlmostDone",
    element : <GoogleUserFinalSetUp/>, 
   errorElement : <SomethingWentWrong/>
}
]},

    {
        path : "/error",
        element : <SomethingWentWrong/>
    },
    
    {
        path : "/v3/user/dashboard/:id",
        element : <SomethingWentWrong/>
    },


    {
        path : "*",
        element : <FourOhFour/>
    }
])


