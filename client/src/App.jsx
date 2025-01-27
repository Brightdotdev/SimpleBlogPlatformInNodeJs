import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { AuthRoutes, DashboardPage } from './Utils/RouteController'


const App = () => {



  

  return (

    <BrowserRouter>
    {<AuthRoutes/>}
    </BrowserRouter>
  )
}

export default App