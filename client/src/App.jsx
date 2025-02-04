import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { AuthRoutes,UsersRoutes } from './Utils/RouteController'


const App = () => {
  return (

    <BrowserRouter>
    <Routes>
      <Route path='/*'  element={<AuthRoutes/>} />
      <Route path='/o/user/*'  element={<UsersRoutes/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App