import React from 'react'

import { Routes,Route, createBrowserRouter } from 'react-router-dom'
import { ProtectedUserRoutes } from './RouteProtectors'

import HomePage from '../Pages/HomePage'
import LogIn from '../Pages/AuthPages/LogIn'
import SignUp from '../Pages/AuthPages/SignUp'

import SignIn from '../Pages/AuthPages/SignIn'
import GoogleUserFinalSetUp from '../Pages/AuthPages/GoogleUserFinalSetUp'
import SomethingWentWrong from '../Pages/AuthPages/SomethingWentWrong'
import Dashboard from '../Pages/Dashboard'
import { AppLoader } from './AppLoadders'
import FourOhFour from '../Pages/FourOhFOur'





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
}
]
    },

    {
        path : "/error",
        element : <SomethingWentWrong/>
    },
    
    {
        path : "*",
        element : <FourOhFour/>
    }
])


