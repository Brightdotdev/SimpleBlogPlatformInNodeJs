import React from 'react'

import { Routes,Route } from 'react-router-dom'
import { ProtectedUserRoutes } from './RouteProtectors'

import HomePage from '../Pages/HomePage'
import LogIn from '../Pages/AuthPages/LogIn'
import SignUp from '../Pages/AuthPages/SignUp'

import SignIn from '../Pages/AuthPages/SignIn'
import GoogleUserFinalSetUp from '../Pages/AuthPages/GoogleUserFinalSetUp'
import SomethingWentWrong from '../Pages/AuthPages/SomethingWentWrong'
import Dashboard from '../Pages/Dashboard'




const UsersRoutes = () =>{

    return(
        <Routes> 
            <Route element={<ProtectedUserRoutes/>} />

            <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes>
    )


}

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/auth/fail" element={<SomethingWentWrong/>}/>
            <Route path="/googleUser/finalSetUp" element={<GoogleUserFinalSetUp/>}/>
            <Route path="/Login" element={<LogIn/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/SignIn" element={<SignIn/>}/>
        </Routes>
    )
}


export {AuthRoutes, UsersRoutes} 